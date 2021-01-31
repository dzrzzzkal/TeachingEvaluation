// pages/evaluationSheet/evaluationSheet.js

const $api = require('../../../api/api')
const util = require('../../../utils/util')

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
    evaluationListData:[
      {
        "event": "教学态度",
        "content": "教学认真，备课细致",
        "recommend": "向学生指出具体并对学习有指导性的目标；有教学内容提纲；对所下结论提供证据信息；结束时有总结。",
        "grade": "",
      },
      {
        "event": "",
        "content": "讲课精神饱满，举止得体，仪容整洁",
        "recommend": "多数时间是面向学生的（不是面对电脑或屏幕），能与大多数学生沟通。",
        "grade": ""
      },
      {
        "event": "教学能力",
        "content": "声音宏亮，外语或普通话发音准确，表达流畅",
        "recommend": "对关键的用词有解释；注重用语的准确、科学性。",
        "grade": ""
      },
      {
        "event": "",
        "content": "时间安排合理，节奏控制好",
        "recommend": "能从容完成授课计划；提问并给予学生时间思考；内容过渡合理。",
        "grade": ""
      },
      {
        "event": "",
        "content": "条理性强，内容熟练，运用启发式教学",
        "recommend": "讲授有条理；对学生表现给予及时反馈；不需要逐字读PPT；鼓励学生自由提问讨论并可随时应对学生的问题。",
        "grade": ""
      },
      {
        "event": "",
        "content": "内容符合大纲要求，重点突出",
        "recommend": "一节课的知识点数量适当；收尾时强调重点；示范对重点知识的应用；提出进一步学习的参考文献；给学生创造应用知识的机会。",
        "grade": ""
      },
      {
        "event": "",
        "content": "理论联系实际；反映学科进展",
        "recommend": "采用具体事例帮助学生理解；结合学科较新热点或引用较新文献。",
        "grade": ""
      },
      {
        "event": "教学手段",
        "content": "内容简明扼要；合理使用多媒体教学手段",
        "recommend": "PPT应清晰；图示应与课程内容相匹配；合理运用图片、视频等资料；多媒体技术运用应服务于课堂教学，避免干扰正常教学秩序情况。",
        "grade": ""
      },
      {
        "event": "学生表现",
        "content": "迟到现象少，听课率高",
        "recommend": "学生缺席、迟到现象少（低于5%）；学生能跟随老师的讲课节奏；不存在与课堂无关的手机、电脑使用情况或低头做其他事情等现象。",
        "grade": ""
      },
      {
        "event": "",
        "content": "课堂表现积极、活跃",
        "recommend": "大多数学生课堂表现活跃，学生之间、师生之间互动积极。",
        "grade": ""
      },
      {
        "event": "总体评价等级",
        "content": "",
        "recommend": "",
        "grade": ""
      },
    ],
    gradeItems: [
      {value: '优+', name: '优+'},
      {value: '优', name: '优'},
      {value: '优-', name: '优-'},
      {value: '良+', name: '良+'},
      {value: '良', name: '良'},
      {value: '良-', name: '良-'},
      {value: '中+', name: '中+'},
      {value: '中', name: '中'},
      {value: '中-', name: '中-'},
      {value: '合格+', name: '合格+'},
      {value: '合格', name: '合格'},
      {value: '合格-', name: '合格-'},
      {value: '不合格+', name: '不合格+'},
      {value: '不合格', name: '不合格'},
      {value: '不合格-', name: '不合格-'},
      {value: '不适用+', name: '不适用+'},
      {value: '不适用', name: '不适用'},
      {value: '不适用-', name: '不适用-'},
    ],
    familiarityItems: [
      {value: '非常熟悉', name: '非常熟悉'},
      {value: '熟悉', name: '熟悉'},
      {value: '不太熟悉', name: '不太熟悉'},
      {value: '完全不熟悉', name: '完全不熟悉'},
    ],
    extendsionItems: [
      {value: true, name: '是'},
      {value: false, name: '否'},
    ],
    followUpItems: [
      {value: true, name: '需要跟进'},
      {value: false, name: '不需要跟进'},
    ],
    followUpDegreeItems: [
      {value: '教研室/系/院/组织了交流讨论', name: '教研室/系/院/组织了交流讨论'},
      {value: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见', name: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见'},
      {value: '建议修订课程目标', name: '建议修订课程目标'}
    ],
    
    // 提交的表单
    baseinfoData: {},
    contentData: {  // 目前设定不需要setData
      evaluationList: [],
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

    gradeChange(e) {
      let index = e.currentTarget.dataset.index
      let evaluationListData = this.data.evaluationListData
      let gradeItems = evaluationListData[index].gradeItems

      let value = e.detail.value

      console.log('event: ')
      console.log(e.currentTarget)

      for(let i = 0, len = gradeItems.length; i < len; ++i) {
        gradeItems[i].checked = gradeItems[i].value === value
      }
      this.setData({
        [`evaluationListData[${index}].gradeItems`]: gradeItems,
        [`contentData.evaluationList[${index}]`]: value,
      })
      console.log(this.data.contentData)
    },

    formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
        [`contentData.${field}`]: e.detail.value
      })
      // this.data.contentData[field] = e.detail.value
    },

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
      let {evaluationListData, gradeItems, contentData, contentRules} = this.data
      let listLength = evaluationListData.length
      for(let i = 0; i < listLength; ++i) {
        evaluationListData[i].gradeItems = gradeItems

        // contentRules.push({
        //   // index为0时，name要为字符串'0，但index为1……时，name可以为字符串'1'……，也为数字1……，不知道为什么
        //   name: `${i}`,
        //   rules: {required: true, message: `content-${i + 1} 必填`}
        // })
      }
      contentRules.push({
        name: 'evaluationList',
        // ↓方便调试，暂时注释，是要的！
        // rules: {require: true, minlength: listLength, message: '评估表未完成'}
      })
      this.setData({
        evaluationListData,
        contentData,
        contentRules,
      })
      // console.log(evaluationListData)
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
          // console.log(that.data.contentData.evaluationList)
          // console.log(that.data.contentData)
          // console.log('ready-setupunit: ' + that.data.contentData.setupUnit)
          // // console.log(res.course)
          // console.log(that.data.classinfo)


        }).catch(err => console.log(err))
    },
  }

})
