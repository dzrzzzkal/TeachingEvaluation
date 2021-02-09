// components/sheetComponents/theoryOfPublicWelfareEvaluation/theoryOfPublicWelfareEvaluation.js

const {radioGroupsChange, initRadioGroupsData} = require('../../../utils/form')
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
        "content": "课堂掌控有序",
        "recommend": "能对课堂进行管理；课堂纪律好。",
        "grade": "",
      },
      {
        "event": "",
        "content": "教学认真，备课细致",
        "recommend": "课程开始时向学生指出具体的学习目标；有教学内容提纲。",
        "grade": ""
      },
      {
        "event": "",
        "content": "讲课精神饱满，举止得体，仪容整洁",
        "recommend": "课程中能有效地引导学生；多数时间是面向学生的（不是面对电脑或屏幕）；能与大多数学生沟通。",
        "grade": ""
      },
      {
        "event": "教学能力",
        "content": "对学生有引导，表达流畅",
        "recommend": "对学生的计划或分享给予及时反馈，能及时指出学生的不足；对关键的用词有解释；注重用语的准确、科学性。",
        "grade": ""
      },
      {
        "event": "",
        "content": "时间安排合理，节奏控制好",
        "recommend": "课程内容安排适当；能让学生始终保持学习兴趣。",
        "grade": ""
      },
      {
        "event": "",
        "content": "条理性强，内容熟练，运用启发式教学",
        "recommend": "讲授或指导有条理，从简单到复杂；老师对自己的计划或总结到位、评价合理；鼓励学生自由提问讨论并可随时应对学生的问题；",
        "grade": ""
      },
      {
        "event": "",
        "content": "理论联系实际；反映该服务内容的新进展",
        "recommend": "理论联系实际；反映该服务内容的新进展",
        "grade": ""
      },
      {
        "event": "教学手段",
        "content": "合理使用多媒体教学手段",
        "recommend": "老师自己上课使用的PPT应清晰；图示应与课程内容相匹配；能引导学生合理运用相片、视频、报告、论文等多种形式进行课程设计或总结。",
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
      radioGroupsChange(e, this, 'theoryOfPublicWelfareEvaluation')
    },
  },

  lifetimes: {
    attached: function() {
      initRadioGroupsData(this, 'evaluationList', 'evaluationListData')
    }
  },
  
  options: {
    addGlobalClass: true
  },
})
