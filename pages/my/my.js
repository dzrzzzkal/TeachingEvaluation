// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './images/user-unlogin.png',
    themes: [
      // { theme_icon: 'images/theme@1.png', theme_name: '待评估', theme_id: 0 },
      { theme_icon: 'images/theme@2.png', theme_name: '评估表', theme_id: 0 },
      { theme_icon: 'images/theme@3.png', theme_name: '年度报告', theme_id: 1 }
    ],
    // userinfo: {
    //   // avatarUrl: '',
    //   name: '用户',
    //   college: '工学院',
    //   department: '计算机系',
    //   role: '督导',
    //   isDean: '系主任'
    // },
    userinfo: {}, // 登录学校账户时服务器发送的教师的信息
    userInfo: {}, // 微信号的用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  themeNavigation: function(e) {
    let theme_id = e.currentTarget.dataset.themeid
    wx.navigateTo({
      url: `../evaluationRecord/evaluationRecord?theme_id=${theme_id}`,
    })
  },

  settingClick: function(e) {
    // console.log(wx.getStorageInfoSync())
    let {index} = e.currentTarget.dataset
    if(index === 0) {
      wx.showModal({
        content: '确定删除所有自定义课程吗',
        success(res) {
          if (res.confirm) {
            wx.removeStorageSync('customCourse')
            wx.showToast({
              title: '删除成功',
            })
          }else if (res.cancel) {
          }
        }
      })
    }else if(index === 1) {
      wx.showModal({
        content: '确定删除所有课程备注吗（指课表中从服务器请求来的课程）',
        success(res) {
          if (res.confirm) {
            wx.removeStorageSync('courseNotes')
            wx.showToast({
              title: '删除成功',
            })
          }
        }
      })
    }
  },

  logout: function() {
    wx.showModal({
      title: '确定退出登录吗？（慎重）',
      content: '所有本地存储信息（用户信息，自定义事件等）将被删除哦。',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userinfo')
          wx.removeStorageSync('customCourse')
          wx.removeStorageSync('courseNotes')
          wx.showToast({
            title: '登出成功',
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/login/login',
            })    
          }, 200)
        }else if (res.cancel) {
        }
      }
    })
    
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login: function() {
    wx.login({
      timeout: 5000,
      success: function(res) {
        if(res.code) {
          // console.log('res.code: ' + res.code)
          var appid = 'wxdddc7e45701a08ba'
          var secret = '0621d2a3e39b9b11bdc493f4469a7d0f'
          var js_code = res.code
          var l = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            success: function(res) {
              // console.log(res)  // include openid
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
    // setTimeout(() => {
    //   console.log(this.data.userInfo)      
    // }, 2000);
    
    // 教师信息
    this.setData({
      userinfo: wx.getStorageSync('userinfo') || {}
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