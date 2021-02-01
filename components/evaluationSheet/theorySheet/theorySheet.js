// pages/evaluationSheet/theorySheet/theorySheet.js

const $api = require('../../../api/api')
const util = require('../../../utils/util')
const {getFormChange} = require('../../../utils/form')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classid: {
      type: String,
    }
  },
  data: {
    // classid: '',
    
    // 自动填充baseinfo
    daytime: '',
    role: '',

    classinfo: {},
    courseinfo: {},

    showTopTips: false,
    roleItems: [
      {value: 'teacher', name: '教师听课'},
      {value: 'leader', name: '领导听课'},
      {value: 'supervisor', name: '督导听课'}
    ],

    followUpDegreeItems: [
      {value: '教研室/系/院/组织了交流讨论', name: '教研室/系/院/组织了交流讨论'},
      {value: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见', name: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见'},
      {value: '建议修订课程目标', name: '建议修订课程目标'}
    ],
    
    // 提交的表单
    baseinfoData: {},
    contentData: {
      
    },

    rules: [
      {
        name: 'setupUnit',
        rules: {required: true, message: '开课单位必填'}
      },
      {
        name: 'name',
        rules: {required: true, message: '课程名称必填'}
      },
      {
        name: 'id',
        rules: {require: true, message: '开课班号必填'}
      },
    ],
    contentRules: [],
  },
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

    radioChange(e, f, fdata) {
      const field = f ? f : e.currentTarget.dataset.field // string
      const fieldData = fdata ? fdata : e.currentTarget.dataset.fielddata // string
      const value = e.detail ? e.detail.value : e
      const items = this.data[fieldData]
      for(let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === value
      }
      this.setData({
        [fieldData]: items,
        [`contentData.${field}`]: value,
      })
      console.log(value)

      // const items = this.data.roleItems
      // // 如果从radio中传入则是e.detail.value，如果是onLoad时调用则传入的形参e是一个值，没有e.detail
      // const value = e.detail ? e.detail.value : e
      // for(let i = 0, len = items.length; i < len; ++i) {
      //   items[i].checked = items[i].value === value
      // }
      // this.setData({
      //   roleItems: items,
      // })
      // console.log(e)
    },

    // 获取 二、评价 表的值
    getEvaluationList(e) {
      // let evaluationList = e.detail
      // this.setData({
      //   'contentData.evaluationList': evaluationList
      // })
      getFormChange(e, this, 'contentData')
      console.log(this.data.contentData)

      // 
      // let i = this.judgeEvaluationListRule()
      // if(i) {
      //   console.log(`第${i}题未填写`)
      // }else {
      //   console.log('evaluationList fulfill!')
      // }
    },

    judgeEvaluationListRule() {
      let evaluationList = this.data.contentData.evaluationList
      let i = 1 // 题号，应为下标+1，所以初始值为1
      for(let item of evaluationList) {
        if(!item) {
          return i  // 返回值为''的第一个题号
        }
        i++
      }
    },

    // 获取 三、总体评价 中的值
    getOverallEvaluation(e) {
      getFormChange(e, this, 'contentData')
      console.log(this.data.contentData)
    },

    // formInputChange(e) {
    //   const {field} = e.currentTarget.dataset
    //   this.setData({
    //     [`contentData.${field}`]: e.detail.value
    //   })
    //   // this.data.contentData[field] = e.detail.value
    // },

    submitForm() {
      var that = this
      this.selectComponent('#content').validate((isValid, errors) => {
        console.log('valid', isValid, errors)
        if(!isValid) {
          const firstError = Object.keys(errors)
          if(firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          wx.showToast({
            title: 'pass!',
          })

          // $api.submitForm(that.data.contentData)
          //   .then(res => {
          //     console.log(res)
          //   })

          console.log(that.data.contentData)

          that.triggerEvent('sendForm', that.data.contentData)
        }
      })
    },

  },

  lifetimes: {
    attached: function() {
      let { contentData, contentRules} = this.data
      // let listLength = evaluationListData.length
      // for(let i = 0; i < listLength; ++i) {
      //   evaluationListData[i].gradeItems = gradeItems

      //   // contentRules.push({
      //   //   // index为0时，name要为字符串'0，但index为1……时，name可以为字符串'1'……，也为数字1……，不知道为什么
      //   //   name: `${i}`,
      //   //   rules: {required: true, message: `content-${i + 1} 必填`}
      //   // })
      // }
      contentRules.push({
        name: 'evaluationList',
        // ↓方便调试，暂时注释，是要的！
        // rules: {require: true, minlength: listLength, message: '评估表未完成'}
      })
      this.setData({
        contentData,
        contentRules,
      })
      // console.log(contentRules)
      
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
              that.radioChange(roleValue, 'role', 'roleItems')
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
              // console.log(item.dataset.field)

              // 要先classinfo，因为classinfo和courseinfo中都有id，要的是开课班号classid
              // 目前有bug，teacher date都没弄，待改
              if(that.data.classinfo[field]) {
                // console.log('classinfo: ' + that.data.classinfo[field])
                that.setData({
                  [`contentData.${field}`]: that.data.classinfo[field]
                })
              } else if(that.data.courseinfo[field]) {
                // console.log('courseinfo: ' + that.data.courseinfo[field])
                that.setData({
                  [`contentData.${field}`]: that.data.courseinfo[field]
                })
              } else {
                // console.log(field + ' : undefined')
                that.setData({
                  [`contentData.${field}`]: 'waiting for modify...'
                })
              }
            })
          })
          .exec()

          console.log(that.data.contentData)

          for(let i in that.data.contentData) {
            console.log(i + ': ' + that.data.contentData[i])
          }
          // console.log(that.data.contentData)
          // console.log('ready-setupunit: ' + that.data.contentData.setupUnit)
          // // console.log(res.course)
          // console.log(that.data.classinfo)


        }).catch(err => console.log(err))
    },
  }

})
