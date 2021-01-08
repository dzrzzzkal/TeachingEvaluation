// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求返回的消息
    notice: [
      {
        id: 0,
        content: 'notice0',
      },
      {
        id: 1,
        content: 'notice1',
      },
      {
        id: 2,
        content: 'notice2',
      },
    ],


  },

  // 点击notice-box，传参id，跳转对应详情页noticeDetail
  noticeJump: function(e) {
    let noticeid = e.currentTarget.dataset.noticeid
    wx.navigateTo({
      url: `../noticeDetail/noticeDetail?id=${noticeid}`,
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