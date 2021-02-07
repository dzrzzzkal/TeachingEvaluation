// components/sheetComponents/environmentEvaluation/environmentEvaluation.js

const {formInputChange} = require('../../../utils/form')

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChange(e){
      formInputChange(e, this, 'environmentEvaluation')
    }
  },

  lifetimes: {
    ready: function() {
      // 发送本自定义组件中的field，用来检验本组件中未填的field
      this.triggerEvent('sendFields', {environmentEvaluation: ['environment']})
    }
  }
})
