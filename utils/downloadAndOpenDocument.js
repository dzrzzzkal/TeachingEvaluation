const downloadAndOpenDocument = (url) => {
  let filePath 
  let fileType
  wx.showLoading({
    title: '下载中',
  })
  wx.downloadFile({
    url: 'http://172.16.30.60:3000' + url,
    header: {
      'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      // 'content-type': 'application/octet-stream',
      // 'cotent-type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    success(res) {
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.statusCode === 200) {
        filePath = res.tempFilePath
        wx.saveFile({
          tempFilePath: filePath,
          success(res) {
            const savedFilePath = res.savedFilePath
            wx.openDocument({
              showMenu: true,
              filePath: savedFilePath,
              // fileType: 'docx',
              success: function (response) {
              },
              fail: function (err) {
                console.log(err)
                wx.showToast({
                  title: '文件打开失败，请重新尝试。',  // '文件下载成功，打开失败，请手动打开'
                  icon: 'none'
                })
              }
            })
          },
          fail(err){
            console.log(err)
            wx.showToast({
              title: '文件保存失败',
              icon: 'none'
            })
          }
        })
        }else {
          wx.showToast({
            title: '文件下载失败',
            icon: 'none'
          })
        }
    },
    fail(err) {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(err)
      wx.showToast({
        title: '文件为空，下载失败',
        icon: 'none'
      })
    }
  })
}

module.exports = downloadAndOpenDocument