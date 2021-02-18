// 参考：
// https://www.jianshu.com/p/da32d38962e7（目前按这个
// https://www.cnblogs.com/wangdashi/p/11585820.html

function request(method, url, data, header) {
  return new Promise(function(resolve, reject) {
    let baseURL = 'http://localhost:3000/api'
    // let baseURL = 'http://192.168.1.4:3000/api'
    let token = wx.getStorageSync('token')
    let defaultHeader = {
      'Authorization': token ? 'Bearer ' + token : null,
      'content-type': 'application/json'
    }
    if(header) {
      if(!header['Authorization']) header['Authorization'] = defaultHeader['Authorization']
    }
    wx.showLoading({
      title: 'Loading',
    })
    wx.request({
      url: baseURL + url,
      method: method,
      // data: method === 'POST' ? JSON.stringify(data) : data, // 这个和'content-type'只能改一个
      data: data,
      header: header || defaultHeader, // 默认json
      success: (res) => {
        //请求成功
        wx.hideLoading({
          // success: (res) => {},
        })
        //判断状态码---errCode状态根据后端定义来判断
        if (!res.data.errCode || res.data.errCode === 0) {
          resolve(res.data);  // 返回res.data，而不是res
        } else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail: (err) => {
        wx.hideLoading({
          // success: (res) => {},
        })
        reject(err)
      }
    })
  })
}

module.exports = request