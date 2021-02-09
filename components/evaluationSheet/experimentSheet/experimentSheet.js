// components/evaluationSheet/experimentSheet/experimentSheet.js

const $api = require('../../../api/api')
const {setFormChange, judgeEvaluationListRule} = require('../../../utils/form')
const {resolveObj, dealTimeFormat, storeComponentsFields, checkRules, dealAndSubmitForm} = require('../../../utils/evaluationSheet')

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
    // 提交的表单
    contentData: {},  // 表单
    formData: {}, // 修改后，真正提交的数据

    // 自定义组件中的field，用来检验未填的field
    componentFields: {},

    // 没用的，实际上没起作用
    rules: [
      {
        name: 'baseinfo',
        rules: {required: true, message: '基本信息 未填'}
      },
      {
        name: 'environment',
        rules: {require: true, message: '一、教学环境观察 未填'}
      },
      {
        name: 'experimentEvaluation',
        rules: {require: true, message: '二、评价 未填'}
      },
      {
        name: 'overallEvaluation',
        rules: {require: true, message: '三、总体评价 未填'}
      },
      
      {
        name: 'followUpRecord',
        rules: {require: true, message: '四、跟进记录 未填'}
      },
    ]
  },
  methods: {
    // 获取自定义组件中的传值
    getFormChange(e) {
      setFormChange(e, this, 'contentData')
      console.log(this.data.contentData)
    },

    // 获取自定义组件传来的fields，写入this.data.componentFields
    getComponentsFields(e) {
      storeComponentsFields(e, this.data.componentFields)
    },

    // 点击提交按钮
    submitForm() {
      dealAndSubmitForm(this, 'experimentEvaluation')
    },
  },

  lifetimes: {
    ready: function() {
      let classification = this.properties.classification
      this.setData({
        'contentData.classification': classification
      })
    }
  }
})
