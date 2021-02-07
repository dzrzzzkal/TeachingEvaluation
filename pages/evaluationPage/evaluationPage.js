// pages/evaluationPage/evaluationPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid: '',
    classification: '',
    classificationItems: [
      {value: 'theory', name: '理论课'},
      {value: 'student report', name: '学生汇报课'},
      {value: 'experiment', name: '实验课'},
      {value: 'PE', name: '体育课'},
      {value: 'theory of public welfare', name: '公益课程理论讲授'},
      {value: 'practice of public welfare', name: '公益课程服务实践'},
    ],

    contentData: '',
  },

  radioChange(e) {
    const items = this.data.classificationItems
    // 如果从radio中传入则是e.detail.value，如果是onLoad时调用则传入的形参e是一个值，没有e.detail
    const value = e.detail ? e.detail.value : e
    for(let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === value
    }
    this.setData({
      classificationItems: items,
      classification: value
    })
    console.log('classification: ' + this.data.classification)
    console.log(this.data)
  },

  // 暂时没用
  getForm(e) {
    this.setData({
      contentData: e.detail
    })
    console.log(this.data.contentData)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classid: options.classid,
    })
    let value
    switch (options.classification) {
      case '理论讲授':
        value = 'theory'
        break;
      case '':
        value = 'student report'
        break;
      case '':
        value = 'experiment'
        break;
      case '':
        value = 'PE'
        break;
      case '':
        value = 'theory of public welfare'
        break;
      case '':
        value = 'practice of public welfare'
        break;
      default:
        break;
    }
    this.radioChange(value)
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