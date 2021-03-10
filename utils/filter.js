// https://segmentfault.com/a/1190000011044371 （目前用这个）
// https://www.jianshu.com/p/8f33a38a671a?from=groupmessage

const appData = getApp().globalData

// 原本叫这个名，之后我应该改成tokenCheck之类的，这个identityFilter()暂时是没起作用的，因为没用到onShow
exports.identityFilter = identityFilter 

function identityFilter(pageObj) {
  if(pageObj.onShow) {
    let _onShow = pageObj.onShow
    pageObj.onShow = function() {
      appData.promise.then(() => {
        // 跳转到登录页
        wx.redirectTo({
          url: '/pages/login/login ',
        })
        console.log('redirect to loginPage')
      }, 
      // service.identityCheck(() => {
      //   // 跳转到登录页
      //   wx.redirectTo({
      //     url: '/pages/login/login',
      //   })
      // },

      (() => {
        // 获取页面实例，防止this劫持
        let currentInstance = getPageInstance()
        _onShow.call(currentInstance) // ?
      })()
      // () => {
      // console.log('!!!!!!!!')
      //   // 获取页面实例，防止this劫持
      //   let currentInstance = getPageInstance()
      //   _onShow.call(currentInstance) // ?
      //   console.log('......')
      // }
      )
    }
  }
  return pageObj
}

function getPageInstance() {
  var pages = getCurrentPages()
  return pages[pages.length - 1]
}
