// pages/my/my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './images/user-unlogin.png',
    themes: [
      { theme_icon: 'images/theme@1.png', theme_name: '待评估', theme_id: 0 },
      { theme_icon: 'images/theme@2.png', theme_name: '已评估', theme_id: 1 },
      { theme_icon: 'images/theme@3.png', theme_name: '年度报告', theme_id: 2 }
    ],
    userInfo: {
      // avatarUrl: '',
      name: '用户',
      college: '工学院',
      department: '计算机系',
      role: '督导',
      isDean: '系主任'
    },
  },
  // 事件处理函数
  themeNavigation: function(e) {
    let theme_id = e.currentTarget.dataset.themeid
    wx.navigateTo({
      url: `../evaluationRecord/evaluationRecord?theme_id=${theme_id}`,
    })
  },
  onLoad: function() {
    
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