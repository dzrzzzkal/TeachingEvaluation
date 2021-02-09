// components/sheetComponents/studentReportEvaluation/studentReportEvaluation.js

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
        "content": "反馈及时，备课充分",
        "recommend": "针对学生的汇报，能及时作出意见反馈，向学生指出具体并对学习有指导性的修改目标；对所下结论提供证据信息；汇报结束能够对汇报内容进行适当点评。",
        "grade": "",
      },
      {
        "event": "",
        "content": "聆听汇报时精神饱满，态度认真 ，举止得体，仪容整洁",
        "recommend": "	聆听汇报时精神饱满，态度认真 ，举止得体，仪容整洁	多数时间是面向学生的，能与汇报人进行有效沟通。	",
        "grade": ""
      },
      {
        "event": "教学能力",
        "content": "声音宏亮，英语或普通话发音准确，表达流畅",
        "recommend": "对关键的用词有解释；注重用语的准确、科学性。",
        "grade": ""
      },
      {
        "event": "",
        "content": "时间安排合理，节奏控制好",
        "recommend": "能提醒学生把控好汇报时间，从容完成课堂计划，提问并给予学生时间思考；内容过渡合理。",
        "grade": ""
      },
      {
        "event": "",
        "content": "课堂氛围把控得当，兼顾把控汇报人与聆听者学习节奏",
        "recommend": "汇报人汇报时，能引导全体学生参与学习，把控课堂纪律。",
        "grade": ""
      },
      {
        "event": "",
        "content": "条理性强，内容熟练，运用启发式教学",
        "recommend": "讲授有条理；对学生表现给予及时反馈；鼓励学生自由提问讨论并可随时应对学生的问题。",
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
        "content": "合理引导学生使用多媒体教学手段",
        "recommend": "针对学生PPT出现的问题（如：PPT不清晰；图示与课程内容不匹配；图片、视频等资料运用不合理等）能指出并提出修改建议；引导学生合理应用多媒体技术，避免干扰正常教学秩序。",
        "grade": ""
      },
      {
        "event": "学生表现",
        "content": "汇报认真，准备充分",
        "recommend": "汇报人准备充分，汇报时态度认真。",
        "grade": ""
      },
      {
        "event": "",
        "content": "迟到现象少，听课率高",
        "recommend": "学生缺席、迟到现象少（低于5%）；<text style='font-weight:bold'>学生能跟随汇报人、老师的讲课节奏；</text>不存在与课堂无关的手机、电脑使用情况或低头做其他事情等现象。",
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
      radioGroupsChange(e, this, 'studentReportEvaluation')
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
