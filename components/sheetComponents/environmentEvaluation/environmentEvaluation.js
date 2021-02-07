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
  }
})
