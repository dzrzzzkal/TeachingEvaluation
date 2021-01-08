// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // boxes: ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
    courses: [
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      
    ],

  },
  
  // ↓网格布局，用的，暂弃
  // boxClick: function(e) {
  //   let that = this
  //   let modifiedBoxindex = e.currentTarget.dataset.boxindex
  //   let box = `boxes[${modifiedBoxindex}]`
  //   that.setData({
  //     // [`boxes[${modifiedBoxindex}]`]: ' '
  //     [box]: 'O',
  //   })
  // },

    courseClick: function(e) {
      let that = this
      let xid = e.target.dataset.xid
      let yid = e.currentTarget.dataset.yid
      let course = `courses[${yid}][${xid}]`
      that.setData({
        [course]: 'O',
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