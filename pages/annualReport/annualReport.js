// pages/index/annualReport/annualReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    uploadpath: '',
    uploadFileName: '',
  },

  download() {
    var that = this
    wx.downloadFile({
      url: 'http://172.16.30.60:3000/api/downloadAnnualReport', 
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        // 'content-type': 'application/json'
      },
      // url: 'http://172.16.30.60:3000/public/annualReportTemplate.docx',
      success: function(res) {
        var filePath = res.tempFilePath;
        wx.openDocument({
          showMenu: true,
            filePath: filePath,
            success: function(res) {
            },
            fail: function(err) {
              wx.showToast({
                title: '打开文档失败',
                icon: 'none'
              })
            },
        })
      },
      fail: function(err) {
        wx.showToast({
          title: '文件下载失败',
          icon: 'none'
        })
      },
    })
  },
  /**
  * 下载、缓存文件并预览
  */
  downloadAndSaveFile() {
    let that = this
    let filePath 
    let fileType
    wx.showLoading({
      title: '下载中',
    })
    wx.downloadFile({
      url: 'http://172.16.30.60:3000/file/annualReportTemplate.docx',
      //  url: 'http://172.16.30.60:3000/api/downloadAnnualReport',
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
          title: '文件下载失败',  // '文件为空，下载失败'
          icon: 'none'
        })
      }
    })
    },

  copyLink: function(){
    let url='http://172.16.30.60:3000/file/annualReportTemplate.docx';
    // let url='http://172.16.30.60:3000/api/downloadAnnualReport'
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.showToast({
          title: '链接复制成功',
          success: function (res) {}
        })
      },
      fail: function(err) {
        wx.showToast({
          title: '链接复制失败',
          icon: 'none'
        })
      }
    })
  },


  selectFile() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      extension: ['doc', 'docx', 'pdf'],
      type: 'file',
      success: (res) => {
        console.log(res)
        let size = res.tempFiles[0].size
        let filename = res.tempFiles[0].name
        let filePath = res.tempFiles[0].path
        that.setData({
          uploadpath: res.tempFiles[0].path,  //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
          uploadFileName: filename  //渲染到wxml方便用户知道自己选择了什么文件
        })
      },
      fail: (res) => {
        // wx.showToast({
        //   title: '选择本地文件失败',
        //   icon: 'none'
        // })
      },
      complete: (res) => {},
    })
  },

  upload() {
    if(!this.data.uploadpath) {
      wx.showToast({
        title: '没有选择需要上传的文件',
        icon: 'none'
      })
      return
    }
    let formData = {
      type: 'file', // 后端接受不到，不知道为什么
    }
    wx.uploadFile({
      filePath: this.data.uploadpath,
      name: 'annualReport',
      url: 'http://172.16.30.60:3000/api/uploadAnnualReport',
      formData: JSON.stringify(formData),
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        // 'content-type': 'application/octet-stream',
      },
      timeout: 0,
      success: (res) => {
        let data = JSON.parse(res.data)
        if(data.code == 1){
          wx.showToast({
            title: '上传成功',
          })
        }else {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
      },
      complete: (res) => {},
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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