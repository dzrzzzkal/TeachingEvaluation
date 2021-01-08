// pages/noticeDetail/noticeDetail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    notice: '',
    getNotice: [
      {
        id: 0,  //待改
        title: '关于《XXXXXXX》课程的评估通知',
        date: '2020/12/11',
        publishUnit: '教务处',
        content: 'XXXXXXXXXXXXXXXXXXXXXXX'
      },
      {
        id: 1,  //待改
        title: '关于1111的教学活动安排',
        date: '2020/12/10',
        publishUnit: '工学院',
        content: '1111111111111111111111111'
      },
      {
        id: 2,  //待改
        title: '关于222222的教学活动安排',
        date: '2020/12/10',
        publishUnit: '工学院',
        content: '222222222222222'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: parseInt(options.id)
    })
    that.data.getNotice.forEach(element => {
      if(element.id === that.data.id) {
        that.setData({
          notice: element
        })
      }
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



// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {

//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {

//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {

//   }
// })
