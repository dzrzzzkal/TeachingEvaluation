// pages/evaluationRecord/evaluationRecord.js

const $api = require('../../api/api')
const downloadAndOpenDocument = require('../../utils/downloadAndOpenDocument')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab-control
    tab_control_item: ['待评估', '已评估','年度报告'],
    currentTabid: 0,

    placeholder: '',

    // 请求返回的内容
    // issuccess: true,

    keyword: '',

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

    currentPage: 1,
    pageSize: 8,
    totalPage: 0,
  },

  // 点击tab-control
  tabClick: function(e) {
    let tabid = e.target.dataset.tabid
    if(tabid === this.data.currentTabid) {
      return
    }
    this.data.currentTabid = tabid
    this.data.currentPage = 1
    this.totalPage = 0
    this.distinguishRequestContent(tabid)
  },

  distinguishRequestContent: function(tabid) {
    switch (tabid) {
      case 0:
        // 待改
        this.getRecords(tabid)
        break;
      case 1:
        this.setData({
          placeholder: '输入 班号/课程编号/教师/课程名/日期(yyyy/mm/dd)'
        })
        this.requestEvaluationSheetList()
        break
      case 2:
        this.setData({
          placeholder: '输入 日期(yyyy/mm/dd)'
        })
        this.requestAnnualReport()
      default:
        break;
    }
  },

  // 根据不同的tabid获取不同的记录内容
  getRecords: function(tabid) {
    switch (tabid) {
      case 0:
        this.setData({
          ec_records: this.data.tobe_ec,
          currentTabid: 0
        })
        break;
      case 1:
        this.setData({
          ec_records: this.data.submitted_ec,
          currentTabid: 1
        })
        break;
      case 2:
        this.setData({
          ec_records: this.data.annual_report,
          currentTabid: 2
        })
        break;
    }
  },

  // 点击查看某个具体的evaluationSheet内容
  recordClick: function(e) {
    let id = e.currentTarget.dataset.id
    switch (this.data.currentTabid) {
      case 0:
        
        break;
      case 1:
        wx.navigateTo({
          url: `../evaluationSheetRecord/evaluationSheetRecord?sheet_id=${id}`
        })
        break;
      case 2:
        downloadAndOpenDocument('/api/annualReport/' + id)
      default:
        break;
    }
    
  },

  searchInput: function(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  search: function() {
    if(!this.data.keyword) {
      wx.showToast({
        title: '请输入搜索关键字哦',
        icon: 'none'
      })
      return
    }
    this.distinguishRequestContent(this.data.currentTabid)
  },

  requestEvaluationSheetList: function() {
    wx.showLoading({
      title: 'Loading',
    })
    $api.getSubmittedSheetList(this.data.keyword, this.data.currentPage, this.data.pageSize)
    .then(result => {
      console.log(result)
      let res = result.rows
      this.data.totalPage = Math.ceil(result.count / this.data.pageSize)
      // 暂时决定不需要用setData，如果要用的话改一下this.getRecords()的传入参数，一起setData
      // this.data.submitted_ec = res
      if(this.data.currentPage == 1) {
        this.data.submitted_ec = res
      }else {
        this.data.submitted_ec = [...this.data.submitted_ec, ...res]
      }
      // this.setData({
      //   submitted_ec: res.eS
      // })
      this.getRecords(this.data.currentTabid)
      wx.hideLoading({
        success: (res) => {},
      })
    })
    .catch(err => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    })
  },

  requestAnnualReport: function() {
    wx.showLoading({
      title: 'Loading',
    })
    $api.getSubmittedAnnualReport(this.data.keyword, this.data.currentPage, this.data.pageSize)
    .then(result => {
      console.log(result)
      let res = result.rows
      this.data.totalPage = Math.ceil(result.count / this.data.pageSize)
      if(this.data.currentPage === 1) {
        this.data.annual_report = res
      }else {
        this.data.annual_report = [...this.data.annual_report, ...res]
      }
      this.getRecords(this.data.currentTabid)
      wx.hideLoading({
        success: (res) => {},
      })
    })
    .catch(err => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    })
  },

  scrollToLower: function() {
    if(this.data.totalPage <= this.data.currentPage) {
      // if(this.data.currentPage == 1) {
      //   return
      // }
      // wx.showToast({
      //   title: '没有下一页数据了',
      //   icon: 'none'
      // })
      return
    }
    ++this.data.currentPage
    this.distinguishRequestContent(this.data.currentTabid)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.currentTabid = parseInt(options.theme_id)
    this.distinguishRequestContent(this.data.currentTabid)
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