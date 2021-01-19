// pages/evaluationInput/evaluationInput.js

const $api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname: '',
    class: [],
  },

  searchInput: function(e) {
    this.setData({
      classname: e.detail.value
    })
  },

  search: function() {
    var that = this
    $api.searchClass(this.data.classname)
      .then(res => {
        that.setData({
          class: res
        })
        console.log(that.data.class)
      })
      .catch(err => console.log(err))
  },

  evaluationInput: function() {
    wx.navigateTo({
      url: '/pages/evaluationSheet/evaluationSheet',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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