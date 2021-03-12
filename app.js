//app.js
App({
  checkLogin() {
    let newPromise = new Promise(function(resolve, reject) {
      // 好像是对自己后台的校验接口的包装，检查登录该页面是否需要系统角色
      // service.identityCheck(resolve, reject) 

      let token = wx.getStorageSync('token')
      if(!token) {
        // console.log('no token')
        wx.reLaunch({
          url: '/pages/login/login',
        })
        reject()
      } else {
        resolve()
      }
    })
    this.globalData.promise = newPromise
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    /**
     * 路由拦截 （PS：这里真不懂，以后待搞懂：https://segmentfault.com/a/1190000011044371）
     * promise来防止页面比异步更早执行
     */
    // 经测试，用了Page(filter({}))，还是有时会先返回 app.js中的let p 中的请求结果之后才执行'/index'中的onLoad()，有时又会先onLoad '/index'再返回app.js中let p的请求结果，可能跟requet()返回时间有关，但是filter.js中设置的是onShow，onShow没有测试
    // 暂时先这样叭
    // 改成了上面的checkLogin()
    // let p = new Promise(function(resolve, reject) {
    // this.globalData.promise = new Promise(function(resolve, reject) {
    //   // 好像是对自己后台的校验接口的包装，检查登录该页面是否需要系统角色
    //   // service.identityCheck(resolve, reject) 

    //   const $api = require('./api/api')
    //   let token = wx.getStorageSync('token')
    //   if(!token) {
    //     // console.log('no token')
    //     wx.reLaunch({
    //       url: '/pages/login/login',
    //     })
    //     reject()
    //   } else {
    //     resolve()
    //     // 待区分token过期和token未过期，并进行处理
    //     // 另，为了方便调试，先注释掉下面代码，不然无法使用编译模式，都要先跳转到index
    //     // wx.reLaunch({
    //     //   url: '/pages/index/index',
    //     // })
    //   }

    //   // checkToken 跳转login，三种token，待确定
    //   // if(!token) {
    //   //   console.log('no token')
    //   //   wx.reLaunch({
    //   //     url: '/pages/login/login',
    //   //   })
    //   // } else {
    //   //   $api.checkToken(token)
    //   //     .then(res => {
    //   //       if(!res.status) {
    //   //         console.log('token过期')
    //   //         wx.reLaunch({
    //   //           url: '/pages/login/login',
    //   //         })
    //   //       } else {
    //   //         console.log('token有效')
    //   //         console.log(res)
    //   //       }
    //   //     })
    //   //     .catch(err => console.log(err))
    //   // }
    // })
    // this.globalData.promise = p
  },
  globalData: {
    userInfo: null,

    promise: null,
  }
})