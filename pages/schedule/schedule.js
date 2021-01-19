// pages/schedule/schedule.js

const $api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // boxes: ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
    courses: [
      ['a', 'b', 'c', 'd','e', ,'g','h','i','j','k','l','m',],
      [],
      // ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      // ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      // ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      // ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
      // ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m',],
    ],
    courses: [],

    // 基本的课程信息
    cs: [],

    // height: '',

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
      let yid = e.currentTarget.dataset.yid
      let xid = e.target.dataset.xid
      if(!xid) return
      let course = `courses[${yid}][${xid}]`
      that.setData({
        [course]: 'O',
      })
    },

    transformDay: function(day) {
      var daynum
      switch (day) {
        case 'Sun':
          daynum = 0
          break;
        case 'Mon':
          daynum = 1
          break;
        case 'Tue':
          daynum = 2
          break;
        case 'Wed':
          daynum = 3
          break;
        case 'Thur':
          daynum = 4
          break;
        case 'Fri':
          daynum = 5
          break;
        case 'Sat':
          daynum = 6
          break;
        default:
          break;
      }
      return daynum
    },

    // 有问题，暂时弃用
    setCourse: function() {
      var that = this

      that.data.cs.forEach((item, index, array) => {
        let time = item.c_time
        time.forEach((item) => {
          let day = item.replace(/[^A-Za-z]/g, '')
          let daynum = that.transformDay(day)
          let sections = item.replace(/[^\d]/g, '')
           // ↓待改进，可能有很多位的，要改成逐个读字符
          let section1 = parseInt(sections.substr(0, 1))

          let section2 = parseInt(sections.substr(1, 2))
          // console.log(section1 + ' ' + section2)
          let course1 = `courses[${daynum}][${section1-1}]`
          that.setData({
              [course1]: '有课',
              // height: '200%',
          })
          let course2 = `courses[${daynum}][${section2-1}]`
          that.setData({
              [course2]: '有课',
          })
          console.log(daynum + ' ' + sections)
        })
      })
    },

    // 接着上面的setCourse，改进并测试中
    setCourse1: function() {
      var that = this
      let csleng = that.data.cs.length
      let timelength = 0
      let mon = []
      // let tue = []
      let thur = []
      that.data.cs.forEach((item, index, array) => {
        let time = item.c_time
        time.forEach((item) => {
          if(item) {
            timelength ++
            let day = item.replace(/[^A-Za-z]/g, '')
            let daynum = that.transformDay(day)
            let sections = item.replace(/[^\d]/g, '')
            if(daynum == 1) {
              mon.push(sections)
              mon.sort()
            } else if(daynum == 4) {
              thur.push(sections)
              thur.sort()
            }
            console.log(mon)
            console.log(thur)
            console.log(item)
          }
          
        })
        console.log(timelength)
      })
      let monlength = mon.length
      that.setData({
        c: mon,
      })
      mon.forEach((item, index, array) => {
        that.setData({
          // cnum: monlength,
          [`courses[1][${index}]`]: item,
          clength: 2,
        })
      })
       
      // if(sections == 34 && daynum == 1) {
      //   var cnum = 3
      // } else if(sections == 34 && daynum == 4) {
      //   var cnum = 2
      // }
      // that.setData({
      //   [`courses[${daynum}]`]: '',
      //   clength: 2,
      //   cnum: cnum,
      // })

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取课程基本信息
    $api.getCourses()
      .then(res => {
        console.log(res)
        that.setData({
          cs: res,
        })

        // that.setCourse()
        that.setCourse1()
      })
      .catch(err => {
        console.log(err)
        wx.showModal({
          content: '未获取到课程信息喔',
          showCancel: false,
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