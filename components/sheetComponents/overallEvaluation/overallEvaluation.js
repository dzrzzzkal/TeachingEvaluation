// components/sheetComponents/overallEvaluation/overallEvaluation.js

const {formInputChange} = require('../../../utils/form')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classification: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    familiarityItems: [
      {value: '非常熟悉', name: '非常熟悉'},
      {value: '熟悉', name: '熟悉'},
      {value: '不太熟悉', name: '不太熟悉'},
      {value: '完全不熟悉', name: '完全不熟悉'},
    ],
    extensionItems: [
      {value: true, name: '是'},
      {value: false, name: '否'},
    ],
    followUpItems: [
      {value: true, name: '需要跟进'},
      {value: false, name: '不需要跟进'},
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChange(e){
      formInputChange(e, this, 'overallEvaluation')
    }
  },
  lifetimes: {
    ready: function() {
      // 发送本自定义组件中的field，用来检验本组件中未填的field
      this.triggerEvent('sendFields', {overallEvaluation: ['appreciateMethod', 'concreteSuggestion', 'familiarity', 'extension', 'followUp', 'otherSuggestion', 'participant', 'year', 'month', 'day']})
    }
  }
})
