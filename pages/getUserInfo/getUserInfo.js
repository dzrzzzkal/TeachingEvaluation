// pages/getUserInfo/getUserInfo.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ↓userInfo
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // ↓下面注释的两个函数以及onLoad 是创建小程序时的首页获取当前登录用户信息的代码，目前先藏起来，之后可以看看，来获取用户信息、头像、权限什么的
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this)
  },

  // login
  login: function() {
    wx.login({
      timeout: 5000,
      success: function(res) {
        if(res.code) {
          console.log('res.code: ' + res.code)
          var appid = 'wxdddc7e45701a08ba'
          var secret = '0621d2a3e39b9b11bdc493f4469a7d0f'
          var js_code = res.code
          var l = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            success: function(res) {
              console.log(res)  // include openid
            },
            fail: function(err) {
              console.log(err)
            }
          })
        } else {
          console.log('获取用户登录态失败' + res.errMsg)
        }
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // login
    this.login()

    // print userInfo
    setTimeout(() => {
      console.log(this.data.userInfo)      
    }, 2000);


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