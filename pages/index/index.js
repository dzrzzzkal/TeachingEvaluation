//index.js
// //获取应用实例

const filter = require('../../utils/filter').identityFilter
const $api = require('../../api/api')
const {getSchoolWeek} = require('../../utils/getSchoolYearAndSemester')

Page(filter({
// Page({
  data: {
    schoolYear: '',
    semester: '',
    week: '',

    themes: [
      { theme_id: 0, theme_icon: 'images/theme@1.png', theme_name: '听课表录入'},
      { theme_id: 1, theme_icon: 'images/theme@2.png', theme_name: '年度报告提交'},
      { theme_id: 2, theme_icon: 'images/theme@3.png', theme_name: '课程搜索'},
      { theme_id: 3, theme_icon: 'images/theme@4.png', theme_name: '单位信息'},
    ],
    tobe_ec: [
      { ec_name: '排球', ec_time: '34', ec_location: '体育场', isPastTime: true },
      { ec_name: '数据库原理', ec_time: '890', ec_location: 'E座303', isPastTime: false },
      { ec_name: '整合思维', ec_time: 'AB', ec_location: 'G座102', isPastTime: false }
    ],

    // 听课任务情况
    ec_submittedNum: 0,
    ec_total: 0,
  },
  //事件处理函数

  // theme-item跳转
  themeNavigation: function(e) {
    let toUrl
    switch (e.currentTarget.dataset.themeid) {
      case 0:
        toUrl = '../evaluationInput/evaluationInput'
        break;
      case 1:
        let {dean} = wx.getStorageSync('userinfo')
        if(dean !== 'true') {
          wx.showToast({
            title: '您不是系主任，不用提交年度报告哦',
            icon: 'none'
          })
          break
        }
        toUrl = '../annualReport/annualReport'
        break;
      case 2:
        toUrl = '../courseSearch/courseSearch'
        break;
      case 3:
        toUrl = '../unitsInfo/unitsInfo'
        break;
    }
    wx.navigateTo({
      url: toUrl,
      success: res => {
        // console.log(res)
      },
      fail: res => {
        // console.log(res)
      },
      complete: res => {
        // console.log(res)
      }
    })
  },

  setTobeEvaluatedCourse: function() {
    let that = this
    let customCourseArray = wx.getStorageSync('customCourse')
    let tobeEvaluatedCourseArray = []
    for(let i of customCourseArray) {
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
        let tobe_ec = {
          ec_name: i.course_name,
          ec_time: i.time,
          ec_week: i.week,
          ec_location: 'location',
          isPastTime,
        }
        tobeEvaluatedCourseArray.push(tobe_ec)
      }
    }
    if(tobeEvaluatedCourseArray.length) {
      function weekSort() {
        return function(obj1, obj2) {
          // let value1 = obj1.ec_week.substring(0, 1)
          // let value2 = obj2.ec_week.substring(0, 1)
          let value1 = obj1.ec_week.indexOf('-') !== -1 ? obj1.ec_week.split('-')[0] : obj1.ec_week
          let value2 = obj2.ec_week.indexOf('-') !== -1 ? obj2.ec_week.split('-')[0] : obj2.ec_week
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
    that.setData({
      tobe_ec: tobeEvaluatedCourseArray
    })
  },

  tobeECClick: function() {
    console.log(this.data.tobe_ec)
    wx.navigateTo({
      url: `/pages/tobeEvaluatedCourse/tobeEvaluatedCourse?schoolYear=${this.data.schoolYear}&semester=${this.data.semester}`,
    })
  },
  
  onLoad: function(options) {

  },

  onShow: function() {
    $api.getEvaluationProgress()
    .then(res => {
      // console.log(res)
      let {submittedNum,beEvaluatedNum, taskCount, schoolYearAndSemester, nowWeek} = res
      let {schoolYear, semester} = schoolYearAndSemester
      this.data.schoolYear = schoolYear
      this.data.semester = semester
      this.data.week = nowWeek
      this.setData({
        ec_submittedNum: submittedNum,
        ec_beEvaluatedNum: beEvaluatedNum ? beEvaluatedNum : '',
        ec_total: taskCount,
      })
      this.setTobeEvaluatedCourse()
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    })
    this.setTobeEvaluatedCourse()
  }
  
// })
}))
