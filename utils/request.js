// 参考：
// https://www.jianshu.com/p/da32d38962e7（目前按这个
// https://www.cnblogs.com/wangdashi/p/11585820.html

// 等下重新封装一下，按这个↓
// https://blog.csdn.net/w001yy/article/details/89361729

function request(method, url, data) {
  return new Promise(function(resolve, reject) {
    let baseURL = 'http://localhost:3000/api'
    let token = wx.getStorageSync('token')
    let header = {
      'Authorization': token ? 'Bearer ' + token : '',
      'content-type': 'application/json'
    }
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === 'POST' ? JSON.stringify(data) : data,
      header: header, // 默认json，不知道后面会不会自己根据method改，再说吧
      success: (res) => {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (!res.data.errCode || res.data.errCode === 0) {
          resolve(res);
        } else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = request