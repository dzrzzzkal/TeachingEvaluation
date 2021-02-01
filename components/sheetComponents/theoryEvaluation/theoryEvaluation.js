// components/sheetComponents/theoryEvaluation.js

const {formRadioGroupChange, initRadioGroupData} = require('../../../utils/form')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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

    evaluationList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gradeChange(e) {
      // let {index} = e.currentTarget.dataset
      // let evaluationListData = this.data.evaluationListData
      // let gradeItems = evaluationListData[index].gradeItems
      // let value = e.detail.value

      // // console.log(e.currentTarget)

      // for(let i = 0, len = gradeItems.length; i < len; ++i) {
      //   gradeItems[i].checked = gradeItems[i].value === value
      // }
      // this.setData({
      //   [`evaluationListData[${index}].gradeItems`]: gradeItems,
      //   [`evaluationList[${index}]`]: value,
      // })

      // // 传值给父组件theorySheet
      // this.triggerEvent('radioChange', this.data.evaluationList)

      formRadioGroupChange(e, this)
    },
  },

  lifetimes: {
    attached: function() {
      // let { evaluationListData, gradeItems, evaluationList} = this.data
      // let listLength = evaluationListData.length
      // for(let i = 0; i < listLength; ++i) {
      //   evaluationListData[i].gradeItems = gradeItems
      //   evaluationList.push('') // 设置数组长度
      // }
      // this.setData({
      //   evaluationListData,
      //   evaluationList
      // })
      initRadioGroupData(this, 'evaluationList', 'evaluationListData', 'gradeItems')
    }
  },
  
  options: {
    addGlobalClass: true
  },
})
