// pages/customCourse/customCourse.js

const $api = require('../../api/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customCourseIndex: -1,
    customCourseArray: [],  // 暂时存储storage中的自定义课程customCourse，提交时push入新的数据，修改storage中的customCourse

    showTopTips: false,

    timeIndex: [0, 0, 0],
    timeArray: [[ 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C'],],

    weekIndex: [0, 0],
    weekArray: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']],

    wlist: [],

    formData: {
      time: 'Mon1', // 暂定决定手动写入time、week初始值
      week: '1'
    },
    rules: [{
      name: 'course_name',
      rules: {required: true, message: '事件名必填'},
    }, {
      name: 'teacher',
      rules: {required: false, message: ''},
    }, {
      name: 'classroom',
      rules: {required: false, message: ''},
    }, {
      name: 'description',
      rules: {required: false, message: ''},
    }, {
      name: 'custom_notes',
      rules: {required: false, message: ''},
    }, {
      name: 'time',
      rules: {required: true, message: '时间必选'},
    }, {
      name: 'week',
      rules: {required: true, message: '周数必选'},
    }, {
      name: 'isTobeEvaluatedCourse',
      rules: {required: false, message: ''},
    }]

  },

  bindTimePickerChange: function (e) {
    let index = e.detail.value
    if(index[1] > index[2]) {
      this.setData({
        error: '错误：起始节次大于终结节次'
      })
      return
    }
    let {timeArray} = this.data
    // 处理timeArray[1][index[1]] + timeArray[2][index[2]]成section（例如: 13 -> 123)
    let section = timeArray[1][index[1]]
    for(let i = index[1]; i < index[2]; i++) {
      section = section + timeArray[1][i + 1]
    }
    this.setData({
        timeIndex: index,
        [`formData.time`]: timeArray[0][index[0]] + section
      })
  },
  bindWeekChange: function (e) {
    let index = e.detail.value
    let week
    let {weekArray} = this.data
    if(index[0] > index[1]) {
      this.setData({
        error: '错误：起始周大于终结周'
      })
      return
    }else if(index[0] === index[1]) {
      week = weekArray[0][index[0]]
    }else { // index[0] < index[1]
      week = weekArray[0][index[0]] + '-' + weekArray[1][index[1]]
    }
    this.setData({
      weekIndex: index,
      [`formData.week`]: week
    })
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: typeof(e.detail.value) === 'boolean' ? String(e.detail.value) : e.detail.value  // 如果是Boolean类型，转成String类型
    })
  },

  getCourse: function() { 
    let courseArray = []

    // 获取自定义课程
    let customCourseArray = this.data.customCourseArray
    for(let i in customCourseArray) {
      let item = customCourseArray[i]
      // 待修改的自定义课程本身不写入courseArray，即不写入wlist，方便判断修改后的课程是否冲突
      if(i !== this.data.customCourseIndex && item.schoolYear === this.data.formData.schoolYear && item.semester === this.data.formData.semester) {
        courseArray.push(item)
      }
    }
    return courseArray
  },

  // 处理、添加 传来的课程数据，写入wlist
  dealCourse: function(courseArr) {
    let wlist = this.data.wlist
    for(let i of courseArr) {
      let time = i.time
      let timeArr = time.split(',')
      for(let j of timeArr) {
        // weekday代表星期几上课，first_section指开始上课的第一节，section_length上课长度，course_name课程名，classroom教室编号
        let weekday = (j.match('Mon') || j.match('Tue') || j.match('Wed') || j.match('Thur') || j.match('Fri') || j.match('Sat') || j.match('Sun'))[0]
        let section = j.split(weekday)[1]
        let section_length = section.length

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

        let item = JSON.parse(JSON.stringify(i))
        item.weekday = weekday
        item.first_section = first_section
        item.section_length = section_length
        if(item.course) { 
          item.course_name = item.course.name
        }
        item.course_time = j

        wlist.push(item)
      }
    }
    this.data.wlist = wlist
  },

  submitData: function() {
    let wlist = this.data.wlist

    let {time} = this.data.formData
    let week_ = this.data.formData.week
    let weekday_ = (time.match('Mon') || time.match('Tue') || time.match('Wed') || time.match('Thur') || time.match('Fri') || time.match('Sat') || time.match('Sun'))[0]
    let section_ = time.split(weekday_)[1]

    for(let i of wlist) {
      let {week, course_time} = i
      let weekday = (course_time.match('Mon') || course_time.match('Tue') || course_time.match('Wed') || course_time.match('Thur') || course_time.match('Fri') || course_time.match('Sat') || course_time.match('Sun'))[0]
      let section = course_time.split(weekday)[1]

      // 先寻找与 提交的自定义课程的星期 相同的课程
      if(weekday_ === weekday) {
        // 再判断 提交课程的周数 与 找到的课程的周数 是否冲突
        let min, max
        if(week.match(/-/)) {
          min = parseInt(week.match(/(\S*)-/)[1])
          max = parseInt(week.match(/-(\S*)/)[1])
        }else {
          min = max = week
        }
        let min_, max_
        if(week_.match(/-/)) {
          min_ = parseInt(week_.match(/(\S*)-/)[1])
          max_ = parseInt(week_.match(/-(\S*)/)[1])
        }else {
          min_ = max_ = week_
        }
        if(max_ < min || max < min_) {  // 提交的自定义课程的周，和现有课程表的课程的周 完全不重合
          // console.log('周数不重合')
          continue  // 提交的周数 与 找到的该节课周数 不重合，不会发生冲突，因此不需要往下判断节次是否重合，直接跳入下一循环
        }

        // 提交的周数 与 找到的该节课周数 存在重合，可能存在冲突，需要继续判断节次是否重合
        let checkStr, checkedStr
        // 例如:section_='67890AB', section='BC'，将长度较短的设为checkStr，较长的设为checkedStr，然后逐个取checkStr中的字符，查询checkedStr中是否存在
        if(section_.length >= section.length) {
          checkStr = section
          checkedStr = section_
        }else {
          checkStr = section_
          checkedStr = section
        }
        for(let j of checkStr) {
          if(checkedStr.indexOf(j) >= 0) {
            // console.log(`与课程 ${i.course_name} ${i.week} ${i.time} 冲突`)
            return `与 ${i.course_name} ${i.week} ${i.time} 冲突`   // 存在冲突，不能提交表单，直接结束整个函数，返回失败原因
          }
        }
      }
    }

    this.data.customCourseArray[this.data.customCourseIndex] = this.data.formData
    wx.setStorageSync('customCourse', this.data.customCourseArray)  // 修改后的自定义课程写入storage
 
    wx.navigateBack({
      delta: 1,
    })

    return '添加成功'
  },

  submitForm() {
    let that = this
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
              error: errors[firstError[0]].message
          })
        }
      } else {
        let courseArray = that.getCourse()
        $api.getCourses(that.data.formData.schoolYear, that.data.formData.semester)
        .then(res => {
          if(res.length) {
            for(let item of res) {  // 把向服务器请求的数据也写入去deal
              courseArray.push(item)
            }
          }
          that.dealCourse(courseArray)  // 将自定义课程和请求来的课程 一起deal
          let show = that.submitData()
          wx.showToast({
            title: show,
            icon: show === '添加成功' ? 'success' : 'none'
          })
        })
        .catch(err => {
          that.dealCourse(courseArray)  // 这里只会deal自定义课程

          wx.showToast({
            title: '未从服务器获取到本学期课程信息，请注意修改后时间可能与本学期实际课程信息冲突哦',
            icon: 'none',
            duration: 2000
          })

          let show = that.submitData()
          wx.showToast({
            title: show,
            icon: show === '添加成功' ? 'success' : 'none'
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.customCourseIndex = options.index
    this.data.customCourseArray = wx.getStorageSync('customCourse')
    let customCourse = this.data.customCourseArray[options.index]
    let {schoolYear, semester, course_name, teacher, classroom, description, time, week, isTobeEvaluatedCourse, custom_notes} = customCourse
    this.data.formData.schoolYear = schoolYear
    this.data.formData.semester = semester

    let weekArray = this.data.weekArray
    let weekIndex = [0, 0]
    if(week.indexOf('-') !== -1) {  // week: 'x-y'
      let startWeek = week.split('-')[0]
      let endWeek = week.split('-')[1]
      for(let i in weekArray[0]) {
        if(startWeek === weekArray[0][i]) {
          for(let j in weekArray[1]) {
            if(endWeek === weekArray[1][j]) {
              weekIndex = [i, j]
              break
            }
          }
          break
        }
      }
    }else { // week: 'z'
      let startAndEndWeek = week
      for(let i in weekArray[0]) {
        if(startAndEndWeek === weekArray[0][i]) {
          weekIndex = [i, i]
          break
        }
      }
    }

    let timeArray = this.data.timeArray
    let timeIndex = [0, 0, 0]
    for(let i in timeArray[0]) {
      let weekday = time.match(/^[A-Za-z]+/g)[0]
      let section = time.split(weekday)[1]
      let startSection = section.substring(0, 1)
      let endSection = section.length !== 1 ? section.substring(section.length - 1, section.length) : startSection
      if(startSection === endSection) {
        if(weekday === timeArray[0][i]) {
          for(let j in timeArray[1]) {
            if(startSection === timeArray[1][j]) {
              timeIndex = [i, j, j]
              break
            }
          }
          break
        }
      }else {
        if(weekday === timeArray[0][i]) {
          for(let j in timeArray[1]) {
            if(startSection === timeArray[1][j]) {
              for(let k in timeArray[2]) {
                if(endSection === timeArray[2][k]) {
                  timeIndex = [i, j, k]
                  break
                }
              }
              break
            }
          }
          break
        }
      }
    }

    this.setData({
      'formData.course_name': course_name,
      'formData.teacher': teacher ? teacher : '',
      'formData.classroom': classroom ? classroom : '',
      'formData.description': description ? description : '',
      timeIndex,
      'formData.time': time,
      weekIndex,
      'formData.week': week,
      'formData.isTobeEvaluatedCourse': isTobeEvaluatedCourse ? isTobeEvaluatedCourse : 'false',
      'formData.custom_notes': custom_notes ? custom_notes : ''
    })


    // // attached:
    // let pages = getCurrentPages() // 当前页面
    // let prevPage = pages[pages.length - 2]  // 上一页面
    // let {schoolYear, semester} = prevPage.data
    // this.data.formData.schoolYear = schoolYear
    // this.data.formData.semester = semester

    // let customCourseArray = wx.getStorageSync('customCourse')
    // if(customCourseArray) {
    //   this.data.customCourseArray = customCourseArray
    // }
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