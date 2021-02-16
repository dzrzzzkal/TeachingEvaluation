// pages/schedule/schedule.js

const $api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */

  data: {

    week: '1',
    weekIndex: 0,
    weeksList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    showWeeks: false,


    // tab0: "日",
    // tab1: "周",
    // type: 0,  //0是学生，1是老师
    // currentTab: 1, //0是日课程表，1是周课程表
    // show: false,
    dayTab: 0,
    // weekList: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    day: ['10.25', '10.26', '10.27', '10.28', '10.29', '10.30', '10.31',],
    wlist: [
      { "weekday": 1, "first_section": 1, "section_lengthh": 4, "course_name": "高等数学啊实打实大大说阿大声道亚特兰蒂斯号", "classroom": "A301", "color": 0, "week": "1-16", "course_time": "Mon1234"},
      { "weekday": 1, "first_section": 5, "section_lengthh": 3, "course_name": "高等数学", "classroom": "A-302", "color": 0 , "week": "9-16", "course_time": "Mon567"},
      { "weekday": 2, "first_section": 1, "section_lengthh": 3, "course_name": "高等数学啊实打实大大说阿大声道", "classroom": "A303", "color": 1, "week": "2-8", "course_time": "Tue123"},
      { "weekday": 2, "first_section": 8, "section_lengthh": 2, "course_name": "计算机应用技术", "classroom": "A304", "color": 1, "week": "1-16", "course_time": "Tue89"},
      { "weekday": 3, "first_section": 2, "section_lengthh": 3, "course_name": "普通物理学", "classroom": "A305", "color": 0, "week": "3-4", "course_time": "Wed234"},
      { "weekday": 3, "first_section": 8, "section_lengthh": 2, "course_name": "计算机网络", "classroom": "A306", "color": 2, "week": "7-16", "course_time": "Wed89"},
      { "weekday": 3, "first_section": 5, "section_lengthh": 2, "course_name": "女士形象设计", "classroom": "A307", "color": 0, "week": "14-16", "course_time": "Wed56"},
      { "weekday": 4, "first_section": 2, "section_lengthh": 3, "course_name": "高等数学", "classroom": "A308", "color": 1, "week": "1-16", "course_time": "Thur234"},
      { "weekday": 4, "first_section": 8, "section_lengthh": 2, "course_name": "排球", "classroom": "A309", "color": 2, "week": "9", "course_time": "Thur89"},
      { "weekday": 5, "first_section": 6, "section_lengthh": 2, "course_name": "计算机网络", "classroom": "A310", "color": 1, "week": "1-16", "course_time": "Fri67"},
      { "weekday": 6, "first_section": 3, "section_lengthh": 2, "course_name": "数据库原理", "classroom": "A311", "color": 2, "week": "1", "course_time": "Sat34"},
      { "weekday": 7, "first_section": 5, "section_lengthh": 3, "course_name": "声乐巡游", "classroom": "", "color": 0, "week": "1-3", "course_time": "Sun567"},
    ],
    dayList: [
      { "jcxx": "第1,2节次 08:00~09:45", "course_name": "大学英语", "skls": "陈江", "classroom": "教A520", "kkyx": "外语学院", "xsrs": "88", "skbj": "外语系521", "type": 0 },
      { "jcxx": "第3,4节次 10:15~11:45", "course_name": "天然药物炮制实验", "skls": "黄雪峰", "classroom": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": 1 },
      { "jcxx": "第5,6节次 10:15~11:45", "course_name": "生物化学", "skls": "黄雪峰", "classroom": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": 1 },
      { "jcxx": "第7,8节次 16:00~18:00", "course_name": "药物经济学", "skls": "黄雪峰", "classroom": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": 1 },
      { "jcxx": "第7,8节次 16:00~18:00", "course_name": "药物经济学", "skls": "黄雪峰", "classroom": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": 1 },
    ]
  },
  clickShow: function (e) {
    var that = this;
    that.setData({
      show: !that.data.show,
    })

    console.log(e)
  },

  clickHide: function (e) {
    var that = this
    that.setData({
      show: false
    })
  },

  swichNav: function (e) {
    this.clickHide();
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.currentTarget.dataset.current,
      })
    }
  },

  stopTouchMove: function () {
    return false;
  },

  dayCheck: function (e) {
    var that = this;
    console.log(e)
    if (that.data.dayTab === e.currentTarget.dataset.daytab) {
      return false;
    } else {
      that.setData({
        dayTab: e.currentTarget.dataset.daytab,
      })
    }
  },

  swiperChange: function (e) {
    var self = this
    self.setData({
      dayTab: e.detail.current,
    })
  },

  showCardView: function (e) {
    console.log(e)
    let cardView = {
      course_name: e.currentTarget.dataset.wlist.course_name,
      color: e.currentTarget.dataset.wlist.color,
      classroom: e.currentTarget.dataset.wlist.classroom,
      teacher_id: e.currentTarget.dataset.wlist.teacher_id,
      classroom: e.currentTarget.dataset.wlist.classroom,
      time: e.currentTarget.dataset.wlist.time,
      week: e.currentTarget.dataset.wlist.week,
    }
    this.setData({
      cardView: cardView
    })
    this.util("open");

  },

  hideModal() {
    this.util("close");
  },

  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 100, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })

      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  studentList: function (e) {
    this.clickHide()
    wx.navigateTo({
      url: '../timeTables0605/timeTables0605',
      success: function(res) {},
    })
  },



  // ---------------------------------------------
    // data: {
  //   week: '1',
  //   weekIndex: 0,
  //   weeksList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  //   showWeeks: false,

  //   weekday: ['一','二','三','四','五','六','日'],

  //   wlist: [
  //     { "weekday": 1, "first_section": 1, "section_lengthh": 4, "course_name": "高等数学啊实打实大大说阿大声道亚特兰蒂斯号", "classroom": "A301", "color": 0 },
  //     { "weekday": 1, "first_section": 5, "section_lengthh": 3, "course_name": "高等数学", "classroom": "A-302", "color": 0 },
  //     { "weekday": 2, "first_section": 1, "section_lengthh": 3, "course_name": "高等数学啊实打实大大说阿大声道", "classroom": "A303", "color": 1 },
  //     { "weekday": 2, "first_section": 8, "section_lengthh": 2, "course_name": "计算机应用技术", "classroom": "A304", "color": 1 },
  //     { "weekday": 3, "first_section": 3, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A305", "color": 2 },
  //     { "weekday": 3, "first_section": 8, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A306", "color": 2 },
  //     { "weekday": 3, "first_section": 5, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A307", "color": 0 },
  //     { "weekday": 4, "first_section": 2, "section_lengthh": 3, "course_name": "高等数学", "classroom": "A308", "color": 1 },
  //     { "weekday": 4, "first_section": 8, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A309", "color": 2 },
  //     { "weekday": 5, "first_section": 1, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A310", "color": 1 },
  //     { "weekday": 6, "first_section": 3, "section_lengthh": 2, "course_name": "高等数学", "classroom": "A311", "color": 2 },
  //     { "weekday": 7, "first_section": 5, "section_lengthh": 3, "course_name": "高等数学", "classroom": "", "color": 0 },
  //   ],
  // },

  showClass: function() {
    // 控制class在其对应的week才出现
    let wlist = this.data.wlist
    for(let i in wlist) {
      let week = wlist[i].week
      let index = i
      let min, max
      if(week.match(/-/)) {
        min = parseInt(week.match(/(\S*)-/)[1])
        max = parseInt(week.match(/-(\S*)/)[1])
      }else {
        min = max = week
      }
      // console.log(min + ' - ' + max)
      // let show = `wlist[${index}].show`
      if(parseInt(this.data.week) >= min && parseInt(this.data.week) <= max) {
        // console.log('true')
        // this.setData({
        //   [show]: 'true'
        // })
        wlist[index].show = 'true'
      }else {
        // console.log('false')
        // this.setData({
        //   [show]: 'false'
        // })
        wlist[index].show = 'false'
      }
    }
    this.setData({
      wlist
    })
    // let {week} = e.currentTarget.dataset.wlist
    // let {index} = e.currentTarget.dataset
    // let min, max
    // if(week.match(/-/)) {
    //   min = week.match(/(\S*)-/)[1];
    //   max = week.match(/-(\S*)/)[1];
    // }else {
    //   min = max = week
    // }
    
    // console.log(min + ' - ' + max)
    // let show = `wlist[${index}].show`
    // if(this.data.week >= min && this.data.week <= max) {
    //   console.log('true')
    //   this.setData({
    //     [show]: 'true'
    //   })
    // }else {
    //   console.log('false')
    //   this.setData({
    //     [show]: 'false'
    //   })
    // }
  },

  // 点击侧边'<'、'>'改变week
  clickSiderWeek: function(e) {
    let weekIndex = this.data.weekIndex
    let weeksList = this.data.weeksList
    let sider = e.currentTarget.dataset.sider
    if(sider === 'left' && weekIndex !== 0) {
      this.setData({
        weekIndex: weekIndex - 1,
        week: weeksList[weekIndex - 1]
      })
    }else if(sider === 'right' && weekIndex !== weeksList.length - 1) {
      this.setData({
        weekIndex: weekIndex + 1,
        week: weeksList[weekIndex + 1]
      })
    }else {
      return
    }

    // 控制class在其对应的week才出现
    this.showClass()
  },
  
  showWeeksScroll: function(e) {
    this.setData({
      showWeeks: !this.data.showWeeks
    })
  },

  // 点击weeksScroll中的week
  chooseWeek: function(e) {
    let {week, index} = e.currentTarget.dataset
    if(week !== this.data.week) {
      this.setData({
        weekIndex: index,
        week,
        showWeeks: !this.data.showWeeks
      })
    }

    // 控制class在其对应的week才出现
    this.showClass()
  },

  // 添加自定义课程
  addCustomCourse: function() {
    this.setData({
      showAdd: true
    })

    wx.navigateTo({
      url: '../../components/customCourseForm/customCourseForm',
    })
  },

  dealCourse: function(courseArr) {
    let wlist = this.data.wlist
    for(let i of courseArr) {
      let time = i.time
      // if(time.indexOf(',') < 0) console.log('true')


      // TEST！！！测试多个上课时间用，例如time = 'Fri12,Wed3456'
      if(time === 'Fri12') {
        time = 'Fri12,Wed3456'
      }


      let timeArr = time.split(',')
      console.log(timeArr)
      for(let j of timeArr) {
        // weekday代表星期几上课，first_section指开始上课的第一节，section_lengthh上课长度，course_name课程名，classroom教室编号
        let weekday = (j.match('Mon') || j.match('Tue') || j.match('Wed') || j.match('Thur') || j.match('Fri') || j.match('Sat') || j.match('Sun'))[0]
        let section = j.split(weekday)[1]
        let section_lengthh = section.length
        // console.log('section: ' + section)
        // console.log('section_lengthh: ' + section_lengthh)

        // 将weekday从'Mon'等设置为对应数字1等
        switch (weekday) {
          case 'Mon':
            weekday = 1
            break;
          case 'Tue':
            weekday = 2
            break;
          case 'Wed':
            weekday = 3
            break;
          case 'Thur':
            weekday = 4
            break;
          case 'Fri':
            weekday = 5
            break;
          case 'Sat':
            weekday = 6
            break;
          case 'Sun':
            weekday = 7
            break;
        }
        // console.log('weekday: ' + weekday)
        // 将section第一个字符设为first_section，包括处理first_section为0、A、B、C这种特殊的
        let first_section = section.substr(0,1)
        if(first_section === '0') {
          first_section = 10
        }else if(first_section === 'A' || first_section === 'B' || first_section === 'C') {
          switch (first_section) {
            case 'A':
              first_section = 11
              break;
            case 'B':
              first_section = 12
              break;
            case 'C':
              first_section = 13
              break;
          }
        }else {
          first_section = parseInt(first_section)
        }
        // console.log('first_section: ' + first_section)

        // let item = i // 坑！这样内循环中的item始终指向的是i的地址，即使内循环设置不同的i.first_section=xxx或yyy等，在同一个内循环中item的first_section数值总为最后一个设置的i.first_section=yyy
        let item = JSON.parse(JSON.stringify(i))
        // 将first_section等写入api请求来的课程，以展示
        item.color = 2
        item.weekday = weekday
        item.first_section = first_section
        item.section_lengthh = section_lengthh
        item.course_name = item.course.name
        // i.classroom = i.classroom
        // i.week = '1-16'
        item.course_time = j
        item.show = 'false'

        wlist.push(item)
        console.log(wlist)
      }
    }
    // 给每个课程增加'show'属性
    for(let i of wlist) {
      i.show = 'false'
    }
    this.data.wlist = wlist

    this.showClass()
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

        let wlist = this.data.wlist

        this.dealCourse(res)
        // for(let i of res) {
        //   let time = i.time
        //   // if(time.indexOf(',') < 0) console.log('true')
        //   let timeArr = time.split(',')
        //   console.log(timeArr)
        //   for(let j of timeArr) {
        //     // weekday代表星期几上课，first_section指开始上课的第一节，section_lengthh上课长度，course_name课程名，classroom教室编号
        //     let weekday = (j.match('Mon') || j.match('Tue') || j.match('Wed') || j.match('Thur') || j.match('Fri') || j.match('Sat') || j.match('Sun'))[0]
        //     let section = j.split(weekday)[1]
        //     let section_lengthh = section.length
        //     // console.log('section: ' + section)
        //     // console.log('section_lengthh: ' + section_lengthh)

        //     // 将weekday从'Mon'等设置为对应数字1等
        //     switch (weekday) {
        //       case 'Mon':
        //         weekday = 1
        //         break;
        //       case 'Tue':
        //         weekday = 2
        //         break;
        //       case 'Wed':
        //         weekday = 3
        //         break;
        //       case 'Thur':
        //         weekday = 4
        //         break;
        //       case 'Fri':
        //         weekday = 5
        //         break;
        //       case 'Sat':
        //         weekday = 6
        //         break;
        //       case 'Sun':
        //         weekday = 7
        //         break;
        //     }
        //     // console.log('weekday: ' + weekday)
        //     // 将section第一个字符设为first_section，包括处理first_section为0、A、B、C这种特殊的
        //     let first_section = section.substr(0,1)
        //     if(first_section === '0') {
        //       first_section = 10
        //     }else if(first_section === 'A' || first_section === 'B' || first_section === 'C') {
        //       switch (first_section) {
        //         case 'A':
        //           first_section = 11
        //           break;
        //         case 'B':
        //           first_section = 12
        //           break;
        //         case 'C':
        //           first_section = 13
        //           break;
        //       }
        //     }else {
        //       first_section = parseInt(first_section)
        //     }
        //     // console.log('first_section: ' + first_section)

        //     // let item = i // 坑！这样内循环中的item始终指向的是i的地址，即使内循环设置不同的i.first_section=xxx或yyy等，在同一个内循环中item的first_section数值总为最后一个设置的i.first_section=yyy
        //     let item = JSON.parse(JSON.stringify(i))
        //     // 将first_section等写入api请求来的课程，以展示
        //     item.color = 2
        //     item.weekday = weekday
        //     item.first_section = first_section
        //     item.section_lengthh = section_lengthh
        //     item.course_name = item.course.name
        //     // i.classroom = i.classroom
        //     // i.week = '1-16'
        //     item.show = 'false'

        //     this.data.wlist.push(item)
        //     console.log(this.data.wlist)
        //   }
        // }

        // // 给每个课程增加'show'属性
        // for(let i of wlist) {
        //   i.show = 'false'
        // }
        // this.data.wlist = wlist

        // this.showClass()
      })
      .catch(err => {
        console.log(err)
        wx.showModal({
          content: '未获取到课程信息喔',
          showCancel: false,
        })
        return
      })
    
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
        })
      },
    })
    console.log(this.data.windowHeight)
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
    var that = this
    var pages = getCurrentPages()
    var currPage = pages[pages.length - 1]  // 当前页面
    if(currPage.data.customCourse) {
      that.setData({
        customCourse111: currPage.data.customCourse
      })
    }
    console.log('↓')
    console.log(this.data.customCourse)
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