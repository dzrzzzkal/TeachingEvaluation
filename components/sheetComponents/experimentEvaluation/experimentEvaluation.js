// components/sheetComponents/experimentEvaluation/experimentEvaluation.js

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
        "event": "",
        "content": "实验环境与实验准备",
        "recommend": "实验规章制度有悬挂上墙；实验场地整洁，实验室教学环境符合卫生和安全的要求。",
        "grade": "",
      },
      {
        "event": "",
        "content": "",
        "recommend": "实验仪器、工具、材料齐备， 且处于良好的使用状态。",
        "grade": ""
      },
      {
        "event": "",
        "content": "教师指导过程",
        "recommend": "对实验目的、实验内容、要求及注意事项的交代清楚明确。",
        "grade": ""
      },
      {
        "event": "",
        "content": "",
        "recommend": "教师能熟练操作和使用实验仪器（或软件工具），能及时发现实验中出现的问题，并恰当地引导学生自行合理解决。",
        "grade": ""
      },
      {
        "event": "",
        "content": "",
        "recommend": "实验内容充实，与实验大纲一致；讲授时间与实验操作时间分配比例恰当。",
        "grade": ""
      },
      {
        "event": "",
        "content": "",
        "recommend": "实验教师让学生独立完成实验、重视操作能力训练。",
        "grade": ""
      },
      {
        "event": "",
        "content": "课堂组织管理",
        "recommend": "每组实验人数安排合理（指在每套仪器设备上同时完成本实验项目的人数），学生能得到充分的动手操作机会。",
        "grade": ""
      },
      {
        "event": "",
        "content": "",
        "recommend": "每组实验人数安排合理（指在每套仪器设备上同时完成本实验项目的人数），学生能得到充分的动手操作机会。",
        "grade": ""
      },
      {
        "event": "",
        "content": "学生表现",
        "recommend": "学生缺席、迟到现象少（低于5%）；学生能跟随老师的讲课节奏；不存在与课堂无关的手机、电脑使用情况或低头做其他事情等现象。",
        "grade": ""
      },
      {
        "event": "",
        "content": "",
        "recommend": "实验前学生有实验预习报告，实验时能遵循学生实验守则及实验安全操作规程。",
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
      radioGroupsChange(e, this, 'experimentEvaluation')
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
