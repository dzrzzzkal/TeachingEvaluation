// pages/tobeEvaluatedCourse/tobeEvaluatedCourse.js

Page({
  data: {
    schoolYear: '',
    semester: '',
    tobe_ec: [],
  },

  setTobeEvaluatedCourse: function() {
    let customCourseArray = wx.getStorageSync('customCourse')
    let tobeEvaluatedCourseArray = []
    for(let index in customCourseArray) {
      let i = customCourseArray[index]
      if(this.data.schoolYear === i.schoolYear && this.data.semester === i.semester && i.isTobeEvaluatedCourse === 'true') {
        let isPastTime = false
        let nowWeek = parseInt(this.data.week)
        if(i.week.indexOf('-') !== -1) { // week: 'x-y'
          let startWeek = parseInt(i.week.split('-')[0])
          let endWeek = parseInt(i.week.split('-')[1])
          if(nowWeek < startWeek || nowWeek > endWeek) {
            isPastTime = true
          }
        }else { // week: 'z'
          if(nowWeek > parseInt(i.week)) {
            isPastTime = true
          }
        }
        // let tobe_ec = {
        //   ec_name: i.course_name,
        //   ec_time: i.time,
        //   week: i.week,
        //   ec_location: 'location',
        //   isPastTime,
        // }
        let tobe_ec = i
        tobe_ec.isPastTime = isPastTime
        tobe_ec.index = index
        tobeEvaluatedCourseArray.push(tobe_ec)
      }
    }
    if(tobeEvaluatedCourseArray.length) {
      function weekSort() {
        return function(obj1, obj2) {
          // let value1 = obj1.week.substring(0, 1)
          // let value2 = obj2.week.substring(0, 1)
          let value1 = obj1.week.indexOf('-') !== -1 ? obj1.week.split('-')[0] : obj1.week
          let value2 = obj2.week.indexOf('-') !== -1 ? obj2.week.split('-')[0] : obj2.week
          if(value1 < value2) {
            return -1
          }else if (value1 > value2) {
            return 1
          }else {
            return 0
          }
        }
      }
      tobeEvaluatedCourseArray.sort(weekSort())
    }
    this.setData({
      tobe_ec: tobeEvaluatedCourseArray
    })
    // console.log(this.data.tobe_ec)
  },

  tobeECClick: function(e) {
    // console.log(e.currentTarget.dataset)
    let {index} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/customCourse/customCourse?index=${index}`,
    })
  },

  
  onLoad: function(options) {
    this.data.schoolYear = options.schoolYear
    this.data.semester = options.semester
    this.data.week = options.week
    // this.setTobeEvaluatedCourse()
  },

  onShow: function() {
    this.setTobeEvaluatedCourse()
  }
  
})
