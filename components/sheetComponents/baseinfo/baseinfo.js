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
      {value: 'teacher', name: '教师听课'},
      {value: 'leader', name: '领导听课'},
      {value: 'supervisor', name: '督导听课'}
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 识别身份以匹配对应的radio
    roleDistinguish(role) {
      switch (role) {
        case '教师':
          return 'teacher'
          break;
        case '领导':
          return 'leader'
          break;
        case '督导':
          return 'supervisorr'
          break;
        default:
          break;
      }
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
            function(res) {
              // console.log(res)
              res.forEach(item => {
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
                }else {
                  that.setData({
                    [field]: 'waiting for modify...'
                  })
                }
                let obj = { [`baseinfo.${field}`]: that.data[field] }
                that.triggerEvent('inputChange', obj)
              })
          })
          .exec()
        }).catch(err => console.log(err))

      // 发送本自定义组件中的field，用来检验本组件中未填的field
      this.triggerEvent('sendFields', {baseinfo: ['setupUnit', 'name', 'id', 'teacher', 'date', 'start_time', 'end_time', 'place', 'attend_num', 'actual_num', 'role']})
    }
  }
})
