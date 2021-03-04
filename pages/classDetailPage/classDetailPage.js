// pages/classDetailPage/classDetailPage.js
const $api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid: '',
    classinfo: {},
    courseinfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    $api.getClass(options.classid)
    .then(res => {
      if(!res || res.fail) {
        wx.showToast({
          title: '没有获取到响应的课程信息哦',
          icon: 'none'
        })
        return
      }
      let classinfo = res
      classinfo.classroom = classinfo.classroom.substring(0, classinfo.classroom.length - 1)
      classinfo.time = classinfo.time.substring(0, classinfo.time.length - 1)
      let courseinfo = classinfo.course
      delete classinfo.course
      that.setData({
        classinfo,
        courseinfo,
        classid: options.classid,
      })
      console.log(this.data.classinfo)
      console.log(this.data.courseinfo)
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: '获取课程信息失败',
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