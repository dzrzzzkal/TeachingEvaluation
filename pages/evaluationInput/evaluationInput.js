// pages/evaluationInput/evaluationInput.js

const $api = require('../../api/api')
const {getSchoolYearAndSemester} = require('../../utils/getSchoolYearAndSemester')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    classes: [],

    schoolYear: '',
    semester: '',
  },

  searchInput: function(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  search: function() {
    if(!this.data.keyword) {
      wx.showToast({
        title: '请输入搜索关键字哦',
        icon: 'none'
      })
      return
    }
    let that = this
    $api.searchClass(this.data.keyword, this.data.schoolYear, this.data.semester)
      .then(res => {
        // console.log(res)
        if(!res.length) {
          wx.showToast({
            title: '没有搜索到相关课程哦',
            icon: 'none'
          })
        }else {
          for(let i of res) {
            let {time, classroom} = i
            i.time = time.substring(0, time.length - 1)
            i.classroom = classroom.substring(0, classroom.length - 1)
          }
        }
        that.setData({
          classes: res
        })
      })
      .catch(err => console.log(err))
  },

  evaluationJump: function(e) {
    let classid = e.currentTarget.dataset.classid
    let classification = e.currentTarget.dataset.classification
    wx.navigateTo({
      url: `/pages/evaluationPage/evaluationPage?classid=${classid}&classification=${classification}`,
    })
  },

  classJump: function(e) {
    let classid = e.currentTarget.dataset.classid
    wx.navigateTo({
      url: `/pages/classDetailPage/classDetailPage?classid=${classid}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let schoolYearAndSemester = getSchoolYearAndSemester()
    let {schoolYear, semester} = schoolYearAndSemester
    this.data.schoolYear = schoolYear
    this.data.semester = semester
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