// pages/my/my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ↓userinfo
    // user: {}, // 暂时改成user，以免和下面的重复
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

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
  themeNavigation: function() {
    wx.navigateTo({
      url: '../evaluationRecord/evaluationRecord',
    })
  },
  onLoad: function() {
    
  },

  // ↓下面注释的两个函数以及onLoad 是创建小程序时的首页获取当前登录用户信息的代码，目前先藏起来，之后可以看看，来获取用户信息、头像、权限什么的
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

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