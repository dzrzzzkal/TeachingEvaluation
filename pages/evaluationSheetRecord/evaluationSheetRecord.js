// pages/evaluationSheetRecord/evaluationSheetRecord.js

const $api = require('../../api/api')
const downloadAndOpenDocument = require('../../utils/downloadAndOpenDocument')
const {matchSheetTitle} = require('../../utils/matchClassificationToChinese')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheet_id: '',
    sheet: {},
  },

  download: function() {
    downloadAndOpenDocument('/api/downloadEvaluationSheet/' + this.data.sheet_id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sheet_id = options.sheet_id
    $api.evaluationSheet(this.data.sheet_id)
      .then(res => {
        // console.log(res)
        let {classification, 
          submitter, course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
          environment, 
          evaluationList, 
          appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, participant, submit_time, 
          followUpDegree, followUpParticipant, followUpParticipantSuggestion, followUpParticipantTime, 
          followUpCollege, followUpCollegeSuggestion, followUpCollegeTime,
          lecturer, lecturerRectification, lecturerTime,
          followUpUnit, followUpUnitSuggestion, followUpUnitTime
        } = res
        let title = matchSheetTitle(classification)
        this.setData({
          sheet: res,
          title, 
          submitter, course_setupUnit, course_name, class_id, teacher_name, class_time, place, attend_num, actual_num, role,
          environment, 
          evaluationList, appreciateMethod, concreteSuggestion, familiarity, extension, followUp, otherSuggestion, participant, submit_time, 
          followUpDegree, followUpParticipant, followUpParticipantSuggestion, followUpParticipantTime, 
          followUpCollege, followUpCollegeSuggestion, followUpCollegeTime,
          lecturer, lecturerRectification, lecturerTime,
          followUpUnit, followUpUnitSuggestion, followUpUnitTime
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})