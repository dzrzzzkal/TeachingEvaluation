// components/sheetComponents/baseinfo/baseinfo.js

const $api = require('../../../api/api')
const util = require('../../../utils/util')
const {formInputChange, radioGroupChange, setRadioGroupChange} = require('../../../utils/form')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // classinfo: {
    //   type: Object
    // },
    // courseinfo: {
    //   type: Object
    // },
    // roleItems: {
    //   type: Object
    // }
    classid: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 自动填充baseinfo
    daytime: '',
    role: '',

    classinfo: {},
    courseinfo: {},
    baseinfo: {},

    roleItems: [
      {value: '教师', name: '教师听课'},
      {value: '领导', name: '领导听课'},
      {value: '督导', name: '督导听课'}
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 识别身份以匹配对应的radio
    roleDistinguish(role) {
      if(role.indexOf('领导') != -1) {
        role = '领导'
      }
      return role
      // switch (role) {
      //   case '教师':
      //     return 'teacher'
      //     break;
      //   case '领导':
      //     return 'leader'
      //     break;
      //   case '督导':
      //     return 'supervisorr'
      //     break;
      //   default:
      //     break;
      // }
    },

    radioChange(e) {
      // const field = f ? f : e.currentTarget.dataset.field // string
      // const fieldData = fdata ? fdata : e.currentTarget.dataset.fielddata // string
      // const value = e.detail ? e.detail.value : e
      // const items = this.data[fieldData]
      // console.log(field)
      // console.log(fieldData)
      // console.log(value)
      // console.log(items)
      // for(let i = 0, len = items.length; i < len; ++i) {
      //   items[i].checked = items[i].value === value
      // }
      // this.setData({
      //   [fieldData]: items,
      //   [`contentData.${field}`]: value,
      // })
      // console.log(value)
      radioGroupChange(e, this, 'baseinfo')
    },

    inputChange(e){
      formInputChange(e, this, 'baseinfo')
    }
  },

  lifetimes: {
    attached: function() {
      
    },
    ready: function() {
      var that = this
      let classid = this.properties.classid
      $api.getClass(classid)
        .then(res => {
          console.log(res)
          // let time = util.formatTime(new Date()).split(' ')[0].split('/')
          let daytime = util.formatTime(new Date()).split(' ')[0]

          wx.getStorage({
            key: 'userinfo',
            success: (res) => {
              let role = res.data.role
              let roleValue = that.roleDistinguish(role)
              setRadioGroupChange(roleValue, that, 'role', 'roleItems', 'baseinfo')
            }
          })
          that.setData({
            classinfo: res,
            courseinfo: res.course,
            daytime,
          })

          const query = this.createSelectorQuery()
          query.selectAll('.initialization').fields({
              dataset: true,
            },
            function(result) {
              // console.log(result)
              let teacher_id = { 'baseinfo.teacher_id': that.data.classinfo.teacher_id }
              that.triggerEvent('inputChange', teacher_id)
              result.forEach(item => {
                let field = item.dataset.field

                // 要先classinfo，因为classinfo和courseinfo中都有id，要的是开课班号classid
                // 目前有bug，teacher date都没弄，待改
                if(that.data.classinfo[field]) {
                  that.setData({
                    [field]: that.data.classinfo[field]
                  })
                }else if(that.data.courseinfo[field]) {
                  that.setData({
                    [field]: that.data.courseinfo[field]
                  })
                }else if(field === 'date') { // date
                  that.setData({
                    [field]: that.data.daytime
                  })
                }
                // console.log(field)
                // console.log(that.data[field])
                let obj = { [`baseinfo.${field}`]: that.data[field] }
                that.triggerEvent('inputChange', obj)
              })
          })
          .exec()
        }).catch(err => console.log(err))

      // 发送本自定义组件中的field，用来检验本组件中未填的field
      this.triggerEvent('sendFields', {baseinfo: ['setupUnit', 'name', 'id', 'teacher_id', 'teacher_name', 'date', 'start_time', 'end_time', 'place', 'attend_num', 'actual_num', 'role']})
    }
  }
})
