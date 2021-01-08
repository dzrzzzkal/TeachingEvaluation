//index.js
// //获取应用实例
// const app = getApp()

Page({
  data: {
    themes: [
      { theme_id: 0, theme_icon: 'images/theme@1.png', theme_name: '听课表录入'},
      { theme_id: 1, theme_icon: 'images/theme@2.png', theme_name: '年度报告提交'},
      { theme_id: 2, theme_icon: 'images/theme@3.png', theme_name: '课程搜索'},
      { theme_id: 3, theme_icon: 'images/theme@4.png', theme_name: '单位信息'},
    ],
    today_ec: [
      { ec_name: '排球', ec_time: '34', ec_location: '体育场', issubmitted: true },
      { ec_name: '数据库原理', ec_time: '890', ec_location: 'E座303', issubmitted: false },
      { ec_name: '整合思维', ec_time: 'AB', ec_location: 'G座102', issubmitted: false }
    ],
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

  onLoad: function () {

  },
})
