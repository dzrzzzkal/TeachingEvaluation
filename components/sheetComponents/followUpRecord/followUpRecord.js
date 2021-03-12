// components/sheetComponents/followUpRecord/followUpRecord.js

const {formInputChange} = require('../../../utils/form')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classification: String,
    isHidden: {
      type: Boolean,
      // value: true,
      // observer: function(newVal,oldVal,change) {
      //   console.log(newVal,oldVal,change)
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    followUpDegreeItems: [
      {value: '教研室/系/院/组织了交流讨论', name: '教研室/系/院/组织了交流讨论'},
      {value: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见', name: '与被听课教师/教学单位负责人/教学管理服务中心交流、反馈了意见'},
      {value: '建议修订课程目标', name: '建议修订课程目标'}
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChange(e){
      formInputChange(e, this, 'followUpRecord')
    }
  },

  lifetimes: {
    ready: function() {
      // // 发送本自定义组件中的field，用来检验本组件中未填的field  // 即使选择了'followUpRecord'，在小程序端不设为必填了
      // this.triggerEvent('sendFields', {followUpRecord: ['followUpDegree', 'followUpParticipantSuggestion', 'followUpParticipant', 'followUpParticipantTime_year', 'followUpParticipantTime_month', 'followUpParticipantTime_day', 'followUpCollegeSuggestion', 'followUpCollege', 'followUpCollegeTime_year', 'followUpCollegeTime_month', 'followUpCollegeTime_day', 'lecturerRectification', 'lecturer', 'lecturerTime_year', 'lecturerTime_month', 'lecturerTime_day', 'followUpUnitSuggestion', 'followUpUnit', 'followUpUnitTime_year', 'followUpUnitTime_month', 'followUpUnitTime_day']})
    }
  }
})
