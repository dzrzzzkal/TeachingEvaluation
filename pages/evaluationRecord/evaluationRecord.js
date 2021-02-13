// pages/evaluationRecord/evaluationRecord.js

const $api = require('../../api/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab-control
    tab_control_item: ['待评估', '已评估','年度报告'],
    currentTabid: 0,

    // 请求返回的内容
    // issuccess: true,
    ec_records: '',
    tobe_ec: [
      {
        id: 0,
        content: 'tobe_ec_record0',
      },
      {
        id: 1,
        content: 'tobe_ec_record1',
      },
      {
        id: 2,
        content: 'tobe_ec_record2',
      },
    ],
    submitted_ec: [
      {
        id: 0,
        content: 'submitted_record0',
      },
      {
        id: 1,
        content: 'submitted_record1',
      },
      {
        id: 2,
        content: 'submitted_record2',
      },
    ],
    annual_report: [
      {
        id: 0,
        content: 'annual_report_record0',
      },
      {
        id: 1,
        content: 'annual_report_record1',
      },
      {
        id: 2,
        content: 'annual_report_record2',
      },
    ],
  },

  // 点击tab-control
  tabClick: function(e) {
    let tabid = e.target.dataset.tabid
    if(tabid === this.data.currentTabid) {
      return
    }
    this.setData({
      currentTabid: tabid
    })
    this.getRecords(tabid)
  },

  // 根据不同的tabid获取不同的记录内容
  getRecords: function(tabid) {
    switch (tabid) {
      case 0:
        this.setData({
          ec_records: this.data.tobe_ec
        })
        break;
      case 1:
        this.setData({
          ec_records: this.data.submitted_ec
        })
        break;
      case 2:
        this.setData({
          ec_records: this.data.annual_report
        })
        break;
    }
  },

  // 点击查看某个具体的evaluationSheet内容
  evaluationSheetClick: function(e) {
    let sheet_id = e.currentTarget.dataset.sheetid
    wx.navigateTo({
      url: `../evaluationSheetRecord/evaluationSheetRecord?sheet_id=${sheet_id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTabid: parseInt(options.theme_id)  // 因为传入的theme_id是字符串类型，所以parseInt()成数字类型
    })

    $api.getSubmittedSheetsList()
      .then(res => {
        console.log(res)
        // 暂时决定不需要用setData，如果要用的话改一下this.getRecords()的传入参数，一起setData
        this.data.submitted_ec = res.eS
        // this.setData({
        //   submitted_ec: res.eS
        // })
        this.getRecords(this.data.currentTabid)
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
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