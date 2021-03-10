// components/customCourseForm/customCourseForm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    customCourseArray: [],  // 暂时存储storage中的自定义课程customCourse，提交时push入新的数据，修改storage中的customCourse

    showTopTips: false,

    timeIndex: [0, 0, 0],
    timeArray: [[ 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C'],],

    weekIndex: [0, 0],
    weekArray: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']],

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
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          // [`formData.time`]: e.detail.value
          [`formData.time`]: timeArray[0][index[0]] + section
        })
        // console.log(e.detail.value)
        // console.log(this.data.formData.time)
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
      // console.log(e.detail.value)
      // console.log('week: ' + this.data.formData.week)
    },

    formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
        [`formData.${field}`]: typeof(e.detail.value) === 'boolean' ? String(e.detail.value) : e.detail.value  // 如果是Boolean类型，转成String类型
      })
      // console.log(this.data.formData)
    },

    submitData: function() {
      let pages = getCurrentPages() // 当前页面
      let prevPage = pages[pages.length - 2]  // 上一页面
      let {wlist} = prevPage.data

      let {time} = this.data.formData
      let week_ = this.data.formData.week
      let weekday_ = (time.match('Mon') || time.match('Tue') || time.match('Wed') || time.match('Thur') || time.match('Fri') || time.match('Sat') || time.match('Sun'))[0]
      let section_ = time.split(weekday_)[1]
      // console.log(weekday_ + ' ' + section_)

      for(let i of wlist) {
        // console.log(i)
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
          // console.log('min_-max_   min-max : ')
          // console.log(min_ + '-' + max_ + ' ' + min + '-' + max )
          if(max_ < min || max < min_) {  // 提交的自定义课程的周，和现有课程表的课程的周 完全不重合
            // console.log('周数不重合')
            continue  // 提交的周数 与 找到的该节课周数 不重合，不会发生冲突，因此不需要往下判断节次是否重合，直接跳入下一循环
          }else if((min_ >= min && max_ <= max)  || (min >= min_ && max <= max_)) { // 总体week/week_更大，全部包含对方，完全重合
            // console.log('week或week_完全包含对方，直接进行下一步course_time是否重合判断即可。')
          }else if(max_ >= min && max_ < max) { // 总体week更大，部分重合，此时不可能完全包含了
            // console.log('部分重合：' + min + '-' + max_)
          }else if(max >= min_ && max < max_) { // 总体week_更大，部分重合，此时不可能完全包含了
            // console.log('部分重合：' + min_ + '-' + max)
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
      this.data.customCourseArray.push(this.data.formData)
      wx.setStorageSync('customCourse', this.data.customCourseArray)  // 新增加的自定义课程写入storage
      prevPage.setData({
        getNewCustomCourse: true,
        newCustomCourse: this.data.formData
      })

      // 直接调用上一页面的dealCourse()，写入课程到wlist，这样做的目的是 让schedule页面onshow时不需要再读取一次storage就可以看到新添加的自定义课程
      prevPage.dealCourse([this.data.formData])
      // // 直接给上一页面赋值
      // prevPage.setData({  
      //   customCourse: this.data.formData
      // })
      wx.navigateBack({
        delta: 1,
      })

      return '添加成功'
    },

    submitForm() {
      this.selectComponent('#form').validate((valid, errors) => {
        // console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
                error: errors[firstError[0]].message
            })
          }
        } else {
          let show = this.submitData()
          wx.showToast({
            title: show,
            icon: show === '添加成功' ? 'success' : 'none'
          })
        }
      })
    }
  },
  lifetimes: {
    created: function() {
      
    },
    attached: function() {
      let pages = getCurrentPages() // 当前页面
      let prevPage = pages[pages.length - 2]  // 上一页面
      let {schoolYear, semester} = prevPage.data
      this.data.formData.schoolYear = schoolYear
      this.data.formData.semester = semester

      let customCourseArray = wx.getStorageSync('customCourse')
      if(customCourseArray) {
        this.data.customCourseArray = customCourseArray
      }
    }
  }
})
