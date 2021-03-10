// pages/schedule/schedule.js

const $api = require('../../api/api')
const {schoolYearList, semesterList, weekList, getSchoolYearAndSemester} = require('../../utils/getSchoolYearAndSemester')
const { getThisWeekDate, getLastWeekDate, getNextWeekDate } = require('../../utils/setWeekDate')

Page({

  /**
   * 页面的初始数据
   */

  data: {
    thisWeek: '1',
    thisWeekIndex: 0,
    week: '1',
    weekIndex: 0,
    // weekList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    weekList: [],
    showWeeks: false,

    date: '', // onLoad时会被设置为new Date()，但如果进行了切换周数，date会被设置为不会流动的时分秒固定的的时间对象，值为切换前的时间±(7 * 切换前后周数差值)，随着周数的切换改变年月日。直到重新onLoad重新设为new Date()
    addDate: 0,
    // 只有是在当前学年和学期下切换周才改变日期
    weekdayAndDate: [
      {
        weekday: '一',
        date: ''
      },
      {
        weekday: '二',
        date: ''
      },
      {
        weekday: '三',
        date: ''
      },
      {
        weekday: '四',
        date: ''
      },
      {
        weekday: '五',
        date: ''
      },
      {
        weekday: '六',
        date: ''
      },
      {
        weekday: '日',
        date: ''
      }
    ],

    thisSchoolYear: '', // 当前日期的学年
    schoolYear: '',
    schoolYearIndex: -1,
    // schoolYearList: ['2018-2019年', '2019-2020年', '2020-2021年', '2021-2022年', '2022-2023年', '2023-2024年', '2024-2025年'],
    schoolYearList: [],
    showSchoolYear: false,
    thisSemester: '', // 当前学期
    semester: '',
    semesterIndex: -1,
    // semesterList: ['春季学期', '夏季学期', '秋季学期'],
    semesterList: [],

    tempSchoolYearIndex: -1, // 用于记录schoolYear&semesterScroll中暂时点击的数据，以便下一步的确认或取消
    tempSemesterIndex: -1,

    // wlist: [
    //   { "weekday": 1, "first_section": 1, "section_length": 4, "course_name": "高等数学啊实打实大大说阿大声道亚特兰蒂斯号", "classroom": "A301", "color": 0, "week": "1-16", "time": "Mon1234", "course_time": "Mon1234"},
    //   { "weekday": 1, "first_section": 5, "section_length": 3, "course_name": "高等数学", "classroom": "A-302", "color": 0 , "week": "9-16", "time": "Mon567", "course_time": "Mon567"},
    //   { "weekday": 2, "first_section": 1, "section_length": 3, "course_name": "高等数学啊实打实大大说阿大声道", "classroom": "A303", "color": 1, "week": "2-8", "time": "Tue123", "course_time": "Tue123"},
    //   { "weekday": 2, "first_section": 8, "section_length": 2, "course_name": "计算机应用技术", "classroom": "A304", "color": 1, "week": "1-16", "time": "Tue89", "course_time": "Tue89"},
    //   { "weekday": 3, "first_section": 2, "section_length": 3, "course_name": "普通物理学", "classroom": "A305", "color": 0, "week": "3-4", "time": "Wed234", "course_time": "Wed234"},
    //   { "weekday": 3, "first_section": 8, "section_length": 2, "course_name": "计算机网络", "classroom": "A306", "color": 2, "week": "7-16", "time": "Wed89", "course_time": "Wed89"},
    //   { "weekday": 3, "first_section": 5, "section_length": 2, "course_name": "女士形象设计", "classroom": "A307", "color": 0, "week": "14-16", "time": "Wed56", "course_time": "Wed56"},
    //   { "weekday": 4, "first_section": 2, "section_length": 3, "course_name": "高等数学", "classroom": "A308", "color": 1, "week": "1-16", "time": "Thur234", "course_time": "Thur234"},
    //   { "weekday": 4, "first_section": 8, "section_length": 2, "course_name": "排球", "classroom": "A309", "color": 2, "week": "9", "time": "Thur89", "course_time": "Thur89"},
    //   { "weekday": 5, "first_section": 6, "section_length": 2, "course_name": "计算机网络", "classroom": "A310", "color": 1, "week": "1-16", "time": "Fri67", "course_time": "Fri67"},
    //   { "weekday": 6, "first_section": 3, "section_length": 2, "course_name": "数据库原理", "classroom": "A311", "color": 2, "week": "1", "time": "Sat34", "course_time": "Sat34"},
    //   { "weekday": 7, "first_section": 5, "section_length": 3, "course_name": "声乐巡游", "classroom": "", "color": 0, "week": "1-3", "time": "Sun567", "course_time": "Sun567"},
    // ],
    wlist: [],

    cardCourseIndex: -1,  // 当前cardView的数据 在this.data.wlist中对应的index

    customCourseArray: [],  // getStorage获取的自定义课程

    timer: {},  // 定时器，用于延迟写备注后写入storage，减少重复调用wx.setStorageSync
  },

  clickHideWeeks: function (e) {
    var that = this
    that.setData({
      showWeeks: false
    })
  },

  showCardView: function (e) {
    let cardView = {
      class_id: e.currentTarget.dataset.wlist.id, // 用于区分是自定义课程还是向服务器请求的课程
      course_name: e.currentTarget.dataset.wlist.course_name,
      color: e.currentTarget.dataset.wlist.color,
      classroom: e.currentTarget.dataset.wlist.classroom,
      teacher_name: e.currentTarget.dataset.wlist.teacher_name ? e.currentTarget.dataset.wlist.teacher_name : e.currentTarget.dataset.wlist.teacher,  // 自定义课程中保存的变量是teacher
      classroom: e.currentTarget.dataset.wlist.classroom,
      time: e.currentTarget.dataset.wlist.time,
      week: e.currentTarget.dataset.wlist.week,
      custom_notes: e.currentTarget.dataset.wlist.custom_notes,
      description: e.currentTarget.dataset.wlist.description, // 可能删掉
      // isCustomCourse: e.currentTarget.dataset.wlist.isCustomCourse,  // 用于判断是否为自定义课程
      isTobeEvaluatedCourse: e.currentTarget.dataset.wlist.isTobeEvaluatedCourse
    }
    this.setData({
      cardView: cardView,
      cardCourseIndex: parseInt(e.currentTarget.dataset.index)
    })
    this.util("open");
  },

  // 只有自定义课程才能设置 是否为待评估课程 的(在首页显示)提醒
  setTobeEvaluatedCourse(e) {
    const {field} = e.currentTarget.dataset
    let cardCourseIndex = this.data.cardCourseIndex
    this.setData({
      [`cardView.${field}`]: e.detail.value[0] ? e.detail.value[0] : 'false',
      [`wlist[${cardCourseIndex}].${field}`]: e.detail.value[0] ? e.detail.value[0] : 'false',
      [`wlist[${cardCourseIndex}].color`]: e.detail.value[0] === 'true' ? 0 : 1
    })
    let course_name = e.currentTarget.dataset.coursename
    let customCourseArray = wx.getStorageSync('customCourse')
    for(let i of customCourseArray) {
      if(course_name === i.course_name) {
        i.isTobeEvaluatedCourse = e.detail.value[0] ? e.detail.value[0] : 'false'
        wx.setStorageSync('customCourse', customCourseArray)
        break
      }
    }
  },

  hideModal() {
    this.util("close");
  },

  // -----
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

  showCourse: function() {
    // 控制course在其对应的week才出现
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
        wlist[index].show = 'true'
      }else {
        wlist[index].show = 'false'
      }
    }
    this.setData({
      wlist
    })
  },

  /**
   * 
   * @param {string} when 字符串类型，选择'last'、'now'、'next'来判断是查看：上一周、当周、下一周
   */
  getShowDate: function(when) {
    let date = this.data.date
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let dateArr
    let setDate // 会被设为不会流动的时分秒固定的时间对象，随setDate()变化
    switch (when) {
      case 'last':
        dateArr = getLastWeekDate(year, month, day)
        this.data.addDate = this.data.addDate - 7
        setDate = date.setDate(date.getDate() - 7)
        setDate = new Date(setDate)
        break;
      case 'now':
        dateArr = getThisWeekDate(year, month, day)
        break;
      case 'next':
        dateArr = getNextWeekDate(year, month, day)
        this.data.addDate = this.data.addDate + 7
        setDate = date.setDate(date.getDate() + 7)
        setDate = new Date(setDate)
        break;
      default:
        break;
    }
    let weekdayAndDate = JSON.parse(JSON.stringify(this.data.weekdayAndDate))
    for(let i in weekdayAndDate) {
      weekdayAndDate[i].date = dateArr[i]
    }
    if(when === 'now') {
      return {weekdayAndDate}
    }else {
      return {weekdayAndDate, setDate}
    }
  },

  // 点击侧边'<'、'>'改变week
  clickSiderWeek: function(e) {
    let weekIndex = this.data.weekIndex
    let weekList = this.data.weekList
    let sider = e.currentTarget.dataset.sider
    if(sider === 'left' && weekIndex !== 0) {
      if(this.data.semester == this.data.thisSemester || this.data.schoolYear == this.data.thisSchoolYear) {  // 只有是在当前学年和学期下切换周才改变日期
        let {weekdayAndDate, setDate} = this.getShowDate('last')
        this.setData({
          date: setDate ? setDate : new Date(),
          weekdayAndDate,
  
          weekIndex: weekIndex - 1,
          week: weekList[weekIndex - 1]
        })
      }else {
        this.setData({
          weekIndex: weekIndex - 1,
          week: weekList[weekIndex - 1]
        })
      }
    }else if(sider === 'right' && weekIndex !== weekList.length - 1) {
      if(this.data.semester == this.data.thisSemester || this.data.schoolYear == this.data.thisSchoolYear) {  // 只有是在当前学年和学期下切换周才改变日期
        let {weekdayAndDate, setDate} = this.getShowDate('next')
        this.setData({
          date: setDate ? setDate : new Date(),
          weekdayAndDate,

          weekIndex: weekIndex + 1,
          week: weekList[weekIndex + 1]
        })
      }else {
        this.setData({
          weekIndex: weekIndex + 1,
          week: weekList[weekIndex + 1]
        })
      }
    }else {
      return
    }

    // 控制course在其对应的week才出现
    this.showCourse()
  },
  
  showWeeksScroll: function(e) {
    this.setData({
      showWeeks: !this.data.showWeeks
    })
  },

  // 点击weeksScroll中的week
  clickShowWeeks: function(e) {
    let {week, index} = e.currentTarget.dataset
    if(week !== this.data.week) {
      if(this.data.semester == this.data.thisSemester || this.data.schoolYear == this.data.thisSchoolYear) {  // 只有是在当前学年和学期下切换周才改变日期
        let diff_value = week - this.data.week
        let times = Math.abs(diff_value)
        let tempDate = this.data.date
        let tempWdAndD = this.data.weekdayAndDate
        for(let i = 0; i < times; i++) {
          let when
          if(diff_value > 0) {
            when = 'next'
          }else {
            when = 'last'
          }
          let {weekdayAndDate, setDate} = this.getShowDate(when)
          this.data.date = setDate ? setDate : new Date()
          tempDate = this.data.date
          this.data.weekdayAndDate = weekdayAndDate
          tempWdAndD = this.data.weekdayAndDate
        }
        this.setData({
          date: tempDate,
          weekdayAndDate: tempWdAndD,

          weekIndex: index,
          week,
          showWeeks: !this.data.showWeeks
        })
      }else {
        this.setData({
          weekIndex: index,
          week,
          showWeeks: !this.data.showWeeks
        })
      }
      
    }

    // 控制course在其对应的week才出现
    this.showCourse()
  },

  showSchoolYearAndSemesterPicker: function(e) {
    this.setData({
      showScrollModalStatus: true,
    });
  },

  // 点击schoolYear&semesterScroll中的item
  chooseSchoolYearAndSemester: function(e) {
    let schoolYearIndex = e.currentTarget.dataset.schoolyearindex
    let semesterIndex = e.currentTarget.dataset.semesterindex
    this.setData({
      tempSchoolYearIndex: schoolYearIndex,
      tempSemesterIndex: semesterIndex
    })
  },

  // 点击schoolYear&semesterScroll中的“取消”按钮
  cancelChangeScroll: function(e) {
    this.setData({
      tempSchoolYearIndex: this.data.schoolYearIndex,
      tempSemesterIndex: this.data.semesterIndex,
      showScrollModalStatus: false
    })
  },

  // 点击schoolYear&semesterScroll中的“确认”按钮
  confirmChangeScroll: function(e) {
    let tempSchoolYearIndex = this.data.tempSchoolYearIndex
    let tempSemesterIndex = this.data.tempSemesterIndex
    this.setData({
      schoolYearIndex: tempSchoolYearIndex,
      schoolYear: this.data.schoolYearList[tempSchoolYearIndex],
      semesterIndex: tempSemesterIndex,
      semester: this.data.semesterList[tempSemesterIndex],
      showScrollModalStatus: !this.data.showScrollModalStatus
    })
    if(this.data.schoolYear === this.data.thisSchoolYear && this.data.semester === this.data.thisSemester) {  // 如果点击"确认"选择了当前日期属于的学年和学期，将this.data.week设置回当前日期属于的学周(即设置回当前日期属于该学年学期的第x周)
      this.setData({
        weekIndex: this.data.thisWeekIndex,
        week: this.data.thisWeek,
      })
    }
    // 根据新的学年和学期请求新的课程 和 自定义课程，写入wlist
    this.getCourse()
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

  // 在card中设置课程备注
  formInputChange(e) {
    const {field, classid, coursename} = e.currentTarget.dataset
    let cardCourseIndex = this.data.cardCourseIndex
    this.setData({
      [`cardView.${field}`]: e.detail.value,
      [`wlist[${cardCourseIndex}].${field}`]: e.detail.value
    })

    clearTimeout(this.data.timer)
    this.data.timer = setTimeout(() => {
      if(classid) {   // 是设置向服务器请求的课程的备注，因为服务器传来的开课编号是唯一的
        let courseNotes = {
          class_id: classid,
          custom_notes: e.detail.value
        }
        let courseNotesArray = wx.getStorageSync('courseNotes')
        if(!courseNotesArray || !courseNotesArray.length) { // courseNotesArray未设置或为[]
          courseNotesArray = []
          courseNotesArray.push(courseNotes)
          wx.setStorageSync('courseNotes', courseNotesArray)
        }else {
          for(let i in courseNotesArray) {
            if(courseNotesArray[i].class_id === classid) {
              if(!e.detail.value.length) {
                courseNotesArray.splice(i, 1)
              }else {
                courseNotesArray[i].custom_notes = e.detail.value
              }
              wx.setStorageSync('courseNotes', courseNotesArray)
              return
            }
          }
          courseNotesArray.push(courseNotes)
          wx.setStorageSync('courseNotes', courseNotesArray)
        }
      }else { // 是设置自定义课程的备注
        let customCourseArray = wx.getStorageSync('customCourse')
        for(let i of customCourseArray) {
          if(i.course_name === coursename && i.schoolYear === this.data.schoolYear && i.semester === this.data.semester) {
            i.custom_notes = e.detail.value
            wx.setStorageSync('customCourse', customCourseArray)
            return
          }
        }
      }
    }, 3000);

    // console.log(this.data.cardView)
    // console.log(this.data.wlist[cardCourseIndex])
  },

  // 处理、添加 传来的课程数据，写入wlist，以展示。然后调用showCourse()进行下一步处理
  dealCourse: function(courseArr) {
    let wlist = this.data.wlist
    for(let i of courseArr) {
      let time = i.time

      // // TEST！！！测试多个上课时间用，例如time = 'Fri12,Wed3456'
      // if(time === 'Fri12') {
      //   time = 'Fri12,Wed3456'
      // }

      let timeArr = time.split(',')
      // console.log(timeArr)
      for(let j of timeArr) {
        // weekday代表星期几上课，first_section指开始上课的第一节，section_length上课长度，course_name课程名，classroom教室编号
        let weekday = (j.match('Mon') || j.match('Tue') || j.match('Wed') || j.match('Thur') || j.match('Fri') || j.match('Sat') || j.match('Sun'))[0]
        let section = j.split(weekday)[1]
        let section_length = section.length
        // console.log('section: ' + section)
        // console.log('section_length: ' + section_length)

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
        let color
        if(item.id) { // 服务器请求课程
          color = 2
        }else if(item.isTobeEvaluatedCourse === 'true') {  //自定义课程中的待评估课程
          color = 0
        }else { //自定义课程中的非待评估课程
          color = 1
        }
        item.color = color
        item.weekday = weekday
        item.first_section = first_section
        item.section_length = section_length
        // ↓处理 请求服务器返回的课程 时调用本函数(返回数据包含item.course.name/yyy，即course_name)。若是处理 添加自定义课程 时调用本函数(返回数据包含item.course_name，不需要另外处理)
        if(item.course) { 
          item.course_name = item.course.name
        }
        item.course_time = j
        item.show = 'false'

        wlist.push(item)
      }
    }
    // 给每个课程增加'show'属性
    for(let i of wlist) {
      i.show = 'false'
    }
    this.data.wlist = wlist
    console.log(wlist)

    this.showCourse()
  },

  // 向服务器请求课程 和 向storage请求存储的自定义课程 并处理展示
  getCourse: function() {
    // 请求前先初始化(清空)this.data.wlist，防止请求其它学期的课程时，this.data.wlist已有课程信息然后混乱
    this.data.wlist = []  // 这里不需要setData，后面调用的函数会setData

    // let wlist = this.data.wlist  // 这里不能用this.data.wlist，好像也是会出现指向地址的问题
    let courseArray = []

    // 获取自定义课程
    let customCourseArray = wx.getStorageSync('customCourse')
    this.data.customCourseArray = customCourseArray
    for(let item of customCourseArray) {
      // item.isCustomCourse = true  // 因为customCourseArray要写入this.data.wlist，用于判断this.data.wlist中的item哪个是自定义课程，以增加一个删除自定义课程功能
      if(item.schoolYear === this.data.schoolYear && item.semester === this.data.semester) {
        courseArray.push(item)
      }
    }
    
    $api.getCourses(this.data.schoolYear, this.data.semester)
      .then(res => {
        if(res.length) {
          let courseNotesArray = wx.getStorageSync('courseNotes')
          if(courseNotesArray && courseNotesArray.length) { // 写入课程的自定义的备注
            for(let item of res) {
              for(let i of courseNotesArray) {
                if(item.id === i.class_id) {
                  item.custom_notes = i.custom_notes
                  break
                }
              }
              courseArray.push(item)
            }
          }else {
            for(let item of res) {  // 把向服务器请求的数据也写入去deal
              courseArray.push(item)
            }
          }
        }
        this.dealCourse(courseArray)  // 将自定义课程和请求来的课程 一起deal
      })
      .catch(err => {
        this.dealCourse(courseArray)  // 这里只会deal自定义课程

        wx.showModal({
          content: '未从服务器获取到课程信息',
          showCancel: false,
        })
      })
  },

  // 点击card删除对应的自定义课程
  deleteCustomCourse: function(e) {
    const that = this
    wx.showModal({
      content: '确定删除该自定义课程吗',
      success(res) {
        if (res.confirm) {
          let cardCourseIndex = that.data.cardCourseIndex
          let wlist = that.data.wlist
          let tobeDeleteCourse = wlist[cardCourseIndex]
          let customCourseArray = that.data.customCourseArray
          for(let i in customCourseArray) {
            if(customCourseArray[i].toString() === tobeDeleteCourse.toString()) {
              customCourseArray.splice(i, 1)
              wlist.splice(cardCourseIndex, 1)
              that.setData({
                wlist,
                customCourseArray,
                showModalStatus: false
              })
              console.log(that.data.wlist)
              wx.setStorageSync('customCourse', customCourseArray)
              break
            }
          }
        }else if (res.cancel) {
          // that.setData({
          //   showModalStatus: false
          // })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    // 根据当前时间设置课表日期
    this.data.date = new Date()
    let {weekdayAndDate} = this.getShowDate('now')
    
    // 根据当前日期设置学年和学期
    let schoolYearAndSemester = getSchoolYearAndSemester()
    let {schoolYearIndex, schoolYear, thisSchoolYear, semesterIndex, semester, thisSemester, tempSchoolYearIndex, tempSemesterIndex} = schoolYearAndSemester
    this.setData({
      weekdayAndDate,

      schoolYearIndex, schoolYear, thisSchoolYear, semesterIndex, semester, thisSemester, tempSchoolYearIndex, tempSemesterIndex,
      schoolYearList,
      semesterList,
      weekList
    })


    // 这一步↓和上面的设置↑重复了，后续看选用哪个。
    // 向服务器请求当前属于的学年、学期、周数
    $api.getSchoolTime()
    .then(res => {
      let {nowWeek, schoolYearAndSemester, schoolYearList, semesterList, weekList} = res
      let {schoolYearIndex, schoolYear, semesterIndex, semester} = schoolYearAndSemester
      that.setData({
        weekIndex: nowWeek - 1, // index 为当前周数-1
        week: nowWeek,  // number
        thisWeekIndex: nowWeek - 1,
        thisWeek: nowWeek,
        schoolYearIndex,
        schoolYear,
        semesterIndex,
        semester,
        thisSchoolYear: schoolYear,
        thisSemester: semester,
        tempSchoolYearIndex: schoolYearIndex,
        tempSemesterIndex: semesterIndex,

        schoolYearList,
        semesterList,
        weekList
      })
    })

    // 向服务器请求课程信息
    this.getCourse()
    
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
        })
      },
    })
    // console.log(this.data.windowHeight)
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
    // if(currPage.data.getNewCustomCourse === true) {
    //   // that.setData({
    //   //   customCourse111: currPage.data.customCourse
    //   // })
    //   this.dealCourse([currPage.data.newCustomCourse])
    //   currPage.data.getNewCustomCourse = false
    // }

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