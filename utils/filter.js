// https://segmentfault.com/a/1190000011044371 （目前用这个）
// https://www.jianshu.com/p/8f33a38a671a?from=groupmessage

const app = getApp()
const appData = getApp().globalData

// 原本叫这个名，之后我应该改成tokenCheck之类的，这个identityFilter()暂时是没起作用的，因为没用到onShow
exports.identityFilter = identityFilter 

function identityFilter(pageObj) {
  if(pageObj.onShow) {
    let _onShow = pageObj.onShow
    pageObj.onShow = function() {

      app.checkToken()
      appData.promise.then((result) => {
        // 获取页面实例，防止this劫持
        let currentInstance = getPageInstance()
        _onShow.call(currentInstance) // ?
      }
      // service.identityCheck(() => {
      //   // 跳转到登录页
      //   wx.redirectTo({
      //     url: '/pages/login/login',
      //   })
      // },
      ).catch((res) => {
        // console.log('redirect to loginPage')
      })
    }
  }
  return pageObj
}

function getPageInstance() {
  var pages = getCurrentPages()
  return pages[pages.length - 1]
}
