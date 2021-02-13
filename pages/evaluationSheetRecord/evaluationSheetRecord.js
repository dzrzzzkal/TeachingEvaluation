// pages/evaluationSheetRecord/evaluationSheetRecord.js

const $api = require('../../api/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheet_id: '',
    sheet: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sheet_id = options.sheet_id
    $api.evaluationSheet(this.data.sheet_id)
      .then(res => {
        console.log(res)
        this.setData({
          sheet: res
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