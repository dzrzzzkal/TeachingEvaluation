// pages/login/login.js

const $api = require('../../api/api')

Component({
  data: {
    showTopTips: false,
    formData: {

    },
    rules: [
      {
        name: 'username',
        rules: {required: true, message: '用户名必填'}
      },
      {
        name: 'password',
        rules: [{required: true, message: '密码必填'}, {rangelength: [6, 12], message: '密码长度要在6-12之间'}]
      }
    ]
  },
  methods: {
    formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
      // console.log(e.detail.value)
    },
    submitForm() {
      this.selectComponent('#form').validate((isValid, errors) => {
        console.log('valid', isValid, errors)
        if(!isValid) {
          const firstError = Object.keys(errors)
          if(firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          // wx.showToast({
          //   title: 'pass!',
          // })

          // this.checkSession()
          this.login()
        }
      })
    },

    // 向微信检查登录态是否过期，即检查session_key
    // 暂时不会用到
    checkSession: function() {
      wx.checkSession({
        success: (res) => { //session_key 未过期，并且在本生命周期一直有效
          console.log(res)
        },
        fail: (res) => {  // session_key 已经失效，需要重新执行登录流程
          console.log(res)
          // this.login()
        },
        // complete: (res) => {},
      })
    },

    // 向微信请求用户登录凭证code，然后发送给服务器
    login: function() {
      let that = this
      wx.login({
        // timeout: 60000,
        success(res) {
          if(res.code) {
            console.log('res.code: ' + res.code)
            $api.doLogin({
              code: res.code, // 将code发送给服务器
              user: that.data.formData.username,
              pass: that.data.formData.password,
            }).then(res => {
              console.log(res)
              let {userinfo, token} = res
              try {
                if(!(userinfo && token)) {
                  wx.showToast({
                    title: '登录失败。',
                    icon: 'none',
                  })
                  return
                }
                wx.setStorageSync('userinfo', userinfo)
                wx.setStorageSync('token', token)
                wx.showToast({
                  title: '登录成功',
                })
                // wx.switchTab({
                //   url: '../index/index',
                // })
                wx.reLaunch({
                  url: '../index/index',
                })
              } catch (error) {
                wx.showToast({
                  title: error,
                })
              }
            }).catch(err => {
              console.log(err)
              wx.showToast({
                // title: JSON.stringify(err),
                title: err.errMsg,
                icon: 'none'
              })
            })
          } else {
            console.log('登录失败。')
            wx.showToast({
              title: '登录失败。',
            })
          }
        }
      })
    },
    
  },

  lifetimes: {
    // 后面待改
    created: function() {
      if(wx.getStorageSync('token')) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    },
  },

  // lifetimes: {
  //   attached: function() {
  //     wx.showLoading({
  //       title: 'ing',
  //     })
  //     console.log('login-begin')
  //     wx.reLaunch({
  //       url: '/pages/index/index',
  //     })
  //     console.log('login-end')
  //     wx.hideLoading({
  //       success: (res) => {console.log('hideLoading')},
  //     })
  //   }
  // }


})
