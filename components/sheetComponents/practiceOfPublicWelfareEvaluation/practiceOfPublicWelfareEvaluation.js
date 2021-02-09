// components/sheetComponents/practiceOfPublicWelfareEvaluation/practiceOfPublicWelfareEvaluation.js

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
        "event": "教师表现",
        "content": "沟通与交流",
        "recommend": "老师在课程中平易近人、令人信任，与学生们进行交流互动，注重培养学生们的交流和沟通能力。",
        "grade": "",
      },
      {
        "event": "",
        "content": "知识传授及价值观引导",
        "recommend": "老师不仅传授公益知识，同时引导学生们如何做人（如如何具有奉献精神和积极、乐观向上的价值取向等）。",
        "grade": ""
      },
      {
        "event": "",
        "content": "启发思考和能力培养",
        "recommend": "老师能启发学生们从多方面思考问题，注重培养学生们综合采用多种思维方式分析问题与解决问题的能力。",
        "grade": ""
      },
      {
        "event": "",
        "content": "活动准备及秩序维护",
        "recommend": "老师在服务前与学生们们一起详细讨论活动方案，活动过程中能够维持活动安全有序。",
        "grade": ""
      },
      {
        "event": "",
        "content": "服务实践与示范",
        "recommend": "老师严格按照活动方案进行实践服务，亲身示范如何安全、有效地进行服务。",
        "grade": ""
      },
      {
        "event": "",
        "content": "突发事件处理",
        "recommend": "老师能有效而及时地处理突发事件与紧急情况。",
        "grade": ""
      },
      {
        "event": "",
        "content": "指导和观察",
        "recommend": "老师能指导学生们如何与服务对象进行交流沟通，观察服务对象的行为和情感变化，进行资料的收集和整理。",
        "grade": ""
      },
      {
        "event": "",
        "content": "总结与反思",
        "recommend": "老师对实践服务进行总结到位、评价合理，在反思、分享过程中注意对学生们进行情感、态度、价值观和环保意识等方面的教育。",
        "grade": ""
      },
      {
        "event": "学生表现",
        "content": "出席与参与情况",
        "recommend": "学生缺席、迟到现象少（低于5%）；学生们都能有条不紊开展公益服务活动，分工明确，各司其职。",
        "grade": ""
      },
      {
        "event": "",
        "content": "表现积极、活跃",
        "recommend": "大多数学生表现活跃，学生之间、师生之间互动积极。",
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
      radioGroupsChange(e, this, 'practiceOfPublicWelfareEvaluation')
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
