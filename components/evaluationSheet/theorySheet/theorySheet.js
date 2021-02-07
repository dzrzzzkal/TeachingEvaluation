// pages/evaluationSheet/theorySheet/theorySheet.js

const $api = require('../../../api/api')
const util = require('../../../utils/util')
const {setFormChange} = require('../../../utils/form')
const form = require('../../../utils/form')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classid: {
      type: String
    },
    classification: {
      type: String
    }
  },
  data: {
    // classid: '',
    
    // // 自动填充baseinfo
    // daytime: '',
    // role: '',

    classinfo: {},
    courseinfo: {},

    showTopTips: false,
    roleItems: [
      {value: 'teacher', name: '教师听课'},
      {value: 'leader', name: '领导听课'},
      {value: 'supervisor', name: '督导听课'}
    ],
    
    // 提交的表单
    // baseinfoData: {},
    contentData: {},
    formData: {},

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

    /**
     * // radioChange(e, f, fdata) {
    //   const field = f ? f : e.currentTarget.dataset.field // string
    //   const fieldData = fdata ? fdata : e.currentTarget.dataset.fielddata // string
    //   const value = e.detail ? e.detail.value : e
    //   const items = this.data[fieldData]
    //   for(let i = 0, len = items.length; i < len; ++i) {
    //     items[i].checked = items[i].value === value
    //   }
    //   this.setData({
    //     [fieldData]: items,
    //     [`contentData.${field}`]: value,
    //   })

    //   // const items = this.data.roleItems
    //   // // 如果从radio中传入则是e.detail.value，如果是onLoad时调用则传入的形参e是一个值，没有e.detail
    //   // const value = e.detail ? e.detail.value : e
    //   // for(let i = 0, len = items.length; i < len; ++i) {
    //   //   items[i].checked = items[i].value === value
    //   // }
    //   // this.setData({
    //   //   roleItems: items,
    //   // })
    //   // console.log(e)
    // },
     * 
     */

    // 获取自定义组件中的传值
    getFormChange(e) {
      setFormChange(e, this, 'contentData')
      console.log(this.data.contentData)
    },

    // 判断 二、评价 表的值
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

    // 将contentData中各个自定义组件传过来的包裹数据的对象分解，分解出各项数据，写入formData
    resolveObj(obj, newObj) {
      for(let i in obj) {
        // newObj[i] = obj[i]
        if(typeof(obj[i]) == 'object' && i != 'evaluationList') {
          this.resolveObj(obj[i], newObj)
        }else {
          newObj[i] = obj[i]
        }
      }
    },

    // 有问题的，因为这份表可能要交到几个部门去根据他们的身份去填写修改表
    // 处理formData中包含时间的格式
    dealTime() {
      let {date, start_time, end_time} = this.data.formData // 相当于baseinfo中的听课时间
      let {year, month, day} = this.data.formData // 相当于overallEvaluation中提交表的时间 和 followUp
      let {followUpParticipantTime_year, followUpParticipantTime_month, followUpParticipantTime_day, followUpCollegeTime_year, followUpCollegeTime_month, followUpCollegeTime_day, lecturerTime_year, lecturerTime_month, lecturerTime_day, followUpUnitTime_year, followUpUnitTime_month, followUpUnitTime_day} = this.data.formData // followUpRecord中跟进记录的各个时间

      let formData = this.data.formData
      let class_time = `${date} ${start_time}-${end_time}`
      formData.class_time = class_time
      delete formData.date; delete formData.start_time; delete formData.end_time
      let submit_time = `${year}/${month}/${day}`
      formData.submit_time = submit_time
      delete formData.year; delete formData.month; delete formData.day

      if(followUpParticipantTime_year) {
        let followUpParticipantTime = `${followUpParticipantTime_year}/${followUpParticipantTime_month}/${followUpParticipantTime_day}`
        formData.followUpParticipantTime = followUpParticipantTime
        delete formData.followUpParticipantTime_year; delete formData.followUpParticipantTime_month; delete formData.followUpParticipantTime_day
      }
      if(followUpCollegeTime_year) {
        let followUpCollegeTime = `${followUpCollegeTime_year}/${followUpCollegeTime_month}/${followUpCollegeTime_day}`
        formData.followUpCollegeTime = followUpCollegeTime
        delete formData.followUpCollegeTime_year; delete formData.followUpCollegeTime_month; delete formData.followUpCollegeTime_day
      }
      if(lecturerTime_year) {
        let lecturerTime = `${lecturerTime_year}/${lecturerTime_month}/${lecturerTime_day}`
        formData.lecturerTime = lecturerTime
        delete formData.lecturer_year; delete formData.lecturer_month; delete formData.lecturer_day
      }
      if(followUpUnitTime_year) {
        let followUpUnitTime = `${followUpUnitTime_year}/${followUpUnitTime_month}/${followUpUnitTime_day}`
        formData.followUpUnitTime = followUpUnitTime
        delete formData.followUpUnitTime_year; delete formData.followUpUnitTime_month; delete formData.followUpUnitTime_day
      }
      this.data.formData = formData
    },


    submitForm() {
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
          // 提交时，如果 三、总体评价 中选择 '不需要跟进'，则删除 四、跟进记录 的数据followUpRecord
          if(this.data.contentData.overallEvaluation && this.data.contentData.overallEvaluation.followUp == 'false') {
            delete this.data.contentData.followUpRecord
          }
          console.log(this.data.contentData)
          // this.triggerEvent('sendForm', this.data.contentData)

          // 将contentData分解，写入formData
          this.resolveObj(this.data.contentData, this.data.formData)
          // 修改一些属性的名称
          this.data.formData.course_name = this.data.formData.name
          this.data.formData.class_id = this.data.formData.id
          this.data.formData.course_setupUnit = this.data.formData.setupUnit
          delete this.data.formData.name; delete this.data.formData.id; delete this.data.formData.setupUnit

          // 有问题的，因为这份表可能要交到几个部门去根据他们的身份去填写修改表
          this.dealTime()
          console.log(this.data.formData)
          $api.submitForm(this.data.formData)
            .then(res => {
              console.log(res)
              wx.showToast({
                title: '提交成功!',
              })
            })
            .catch(err => {
              console.log(err)
              wx.showToast({
                title: '提交失败',
                icon: 'none'
              })
            })
        }
      })
    },
  },

  lifetimes: {
    ready: function() {
      let classification = this.properties.classification
      this.setData({
        'contentData.classification': classification
      })
    }

    // attached: function() {
    //   let { contentData, contentRules} = this.data
    //   // let listLength = evaluationListData.length
    //   // for(let i = 0; i < listLength; ++i) {
    //   //   evaluationListData[i].gradeItems = gradeItems

    //   //   // contentRules.push({
    //   //   //   // index为0时，name要为字符串'0，但index为1……时，name可以为字符串'1'……，也为数字1……，不知道为什么
    //   //   //   name: `${i}`,
    //   //   //   rules: {required: true, message: `content-${i + 1} 必填`}
    //   //   // })
    //   // }
    //   contentRules.push({
    //     name: 'evaluationList',
    //     // ↓方便调试，暂时注释，是要的！
    //     // rules: {require: true, minlength: listLength, message: '评估表未完成'}
    //   })
    //   this.setData({
    //     contentData,
    //     contentRules,
    //   })
    //   // console.log(contentRules)
      
    // },
    // ready: function() {
    //   var that = this
    //   let classid = this.properties.classid
    //   $api.getClass(classid)
    //     .then(res => {
    //       // let time = util.formatTime(new Date()).split(' ')[0].split('/')
    //       let daytime = util.formatTime(new Date()).split(' ')[0]

    //       wx.getStorage({
    //         key: 'userinfo',
    //         success: (res) => {
    //           let role = res.data.role
    //           let roleValue = that.roleDistinguish(role)
    //           that.radioChange(roleValue, 'role', 'roleItems')
    //         }
    //       })

    //       that.setData({
    //         classinfo: res,
    //         courseinfo: res.course,
    //         daytime,
    //       })

    //       const query = this.createSelectorQuery()
    //       query.selectAll('.initialization').fields({
    //         dataset: true,
    //       },
    //         function(res) {
    //         // console.log(res)
    //         res.forEach(item => {
    //           let field = item.dataset.field
    //           // console.log(item.dataset.field)

    //           // 要先classinfo，因为classinfo和courseinfo中都有id，要的是开课班号classid
    //           // 目前有bug，teacher date都没弄，待改
    //           if(that.data.classinfo[field]) {
    //             // console.log('classinfo: ' + that.data.classinfo[field])
    //             that.setData({
    //               [`contentData.${field}`]: that.data.classinfo[field]
    //             })
    //           } else if(that.data.courseinfo[field]) {
    //             // console.log('courseinfo: ' + that.data.courseinfo[field])
    //             that.setData({
    //               [`contentData.${field}`]: that.data.courseinfo[field]
    //             })
    //           } else {
    //             // console.log(field + ' : undefined')
    //             that.setData({
    //               [`contentData.${field}`]: 'waiting for modify...'
    //             })
    //           }
    //         })
    //       })
    //       .exec()

    //       console.log(that.data.contentData)

    //       for(let i in that.data.contentData) {
    //         console.log(i + ': ' + that.data.contentData[i])
    //       }
    //       // console.log(that.data.contentData)
    //       // console.log('ready-setupunit: ' + that.data.contentData.setupUnit)
    //       // // console.log(res.course)
    //       // console.log(that.data.classinfo)


    //     }).catch(err => console.log(err))
    // },
  }

})
