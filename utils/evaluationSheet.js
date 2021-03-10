/**
 * 将contentData中各个自定义组件传过来的包裹数据的对象分解，分解出各项数据，写入formData
 * @param {Object} obj 直接传入对象this.data...，所以不用传入参数this
 * @param {Object} newObj 存入的新对象
 */
const resolveObj = (obj, newObj) => {
  for(let i in obj) {
    // newObj[i] = obj[i]
    // 评价表中的数组名字要统一叫evaluationList
    if(typeof(obj[i]) == 'object' && i != 'evaluationList') {
      resolveObj(obj[i], newObj)
    }else {
      newObj[i] = obj[i]
    }
  }
}

/**
 * 有问题的，因为这份表可能要交到几个部门去根据他们的身份去填写修改表，而且代码很丑
 * 处理formData中包含时间的格式
 * @param {Object} formData this.data.formData
 */
const dealTimeFormat = (formData) => {
  // let {date, start_time, end_time} = this.data.formData 
  let {date, start_time, end_time} = formData // 相当于baseinfo中的听课时间
  let {year, month, day} = formData // 相当于overallEvaluation中提交表的时间 和 followUp
  let {followUpParticipantTime_year, followUpParticipantTime_month, followUpParticipantTime_day, followUpCollegeTime_year, followUpCollegeTime_month, followUpCollegeTime_day, lecturerTime_year, lecturerTime_month, lecturerTime_day, followUpUnitTime_year, followUpUnitTime_month, followUpUnitTime_day} = formData // followUpRecord中跟进记录的各个时间

  let class_time = `${date} ${start_time}-${end_time}`
  formData.class_time = class_time
  delete formData.date; delete formData.start_time; delete formData.end_time
  let submit_time = `${year}/${month}/${day}`
  formData.submit_time = submit_time
  delete formData.year; delete formData.month; delete formData.day

  if(followUpParticipantTime_year) {
    let followUpParticipantTime = `${followUpParticipantTime_year}/${followUpParticipantTime_month}/${followUpParticipantTime_day}`
    formData.followUpParticipantTime = followUpParticipantTime
    delete formData.followUpParticipantTime_year; delete formData.followUpParticipantTime_month; delete formData.followUpParticipantTime_day
  }
  if(followUpCollegeTime_year) {
    let followUpCollegeTime = `${followUpCollegeTime_year}/${followUpCollegeTime_month}/${followUpCollegeTime_day}`
    formData.followUpCollegeTime = followUpCollegeTime
    delete formData.followUpCollegeTime_year; delete formData.followUpCollegeTime_month; delete formData.followUpCollegeTime_day
  }
  if(lecturerTime_year) {
    let lecturerTime = `${lecturerTime_year}/${lecturerTime_month}/${lecturerTime_day}`
    formData.lecturerTime = lecturerTime
    delete formData.lecturer_year; delete formData.lecturer_month; delete formData.lecturer_day
  }
  if(followUpUnitTime_year) {
    let followUpUnitTime = `${followUpUnitTime_year}/${followUpUnitTime_month}/${followUpUnitTime_day}`
    formData.followUpUnitTime = followUpUnitTime
    delete formData.followUpUnitTime_year; delete formData.followUpUnitTime_month; delete formData.followUpUnitTime_day
  }
}

/**
 * 父组件获取自定义组件传来的fields，写入对象(默认)this.data.componentFields
 * @param {*} e 事件e
 * @param Object} obj 默认this.data.componentFields
 */
const storeComponentsFields = (e, obj) => {
  for(let i in e.detail) {
    // this.data.componentFields[i] = e.detail[i]
    obj[i] = e.detail[i]
  }
}


const {judgeEvaluationListRule} = require('./form')
/**
 * 
 * @param {*} that 
 * @param {String} evaluationComponentName 自定义组件的名称，即该组件传到contentData中的对象名，例如'theoryEvaluation', 'studentReportEvaluation'等
 */
const checkRules = (that, evaluationComponentName) => {
  let err
  // let {baseinfo, enviornment, overallEvaluation, followUpRecord} = this.data.contentData
  // let componments = ['baseinfo', 'environmentEvaluation', 'theoryEvaluation', 'overallEvaluation']
  let componments = ['baseinfo', 'environmentEvaluation', evaluationComponentName, 'overallEvaluation']
  if(that.data.contentData.overallEvaluation && that.data.contentData.overallEvaluation.followUp == 'true') {
    componments.push('followUpRecord')
  }
  for(let i of componments) {
    if(that.data.contentData[i]) {
      if(i === evaluationComponentName) {  // 因为this.data[evaluationComponentName].evaluationList为数组
        let t = judgeEvaluationListRule(that.data.contentData[evaluationComponentName].evaluationList)  // 判断 二、评价 中第一个未填的题号
        err = t
      }else {
        let arr = that.data.componentFields[i]
        for(let j of arr) {
          if(i === 'baseinfo') {
            if(j === 'attend_num' || j === 'actual_num') {
              if(that.data.contentData[i][j] != parseInt(that.data.contentData[i][j])) {
                err = j + ' 不是数字类型 或'
                break
              }
            }else if(j === 'date') {
              if(!that.data.contentData[i][j] || !that.data.contentData[i][j].match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}/)) {
                err = j + '没有按照格式：yyyy/mm/dd填写 或'
                break
              }
            }
          }
          if(!that.data.contentData[i][j] || that.data.contentData == '') {
            err = j
            break
          }
        }
      }
      if(err) break
    }else {
      err = i
      break
    }
  }
  if(err) {
    that.setData({
      error: `${err} 未填`
    })
    return false
  }
  return true
}

const $api = require('../api/api')
/**
 * 处理一些数据并提交表单
 * @param {*} that 
 * @param {*} evaluationComponentName 自定义组件的名称，用于checkRules()
 */
const dealAndSubmitForm = (that, evaluationComponentName) => {
  that.selectComponent('#content').validate((isValid, errors) => {
    console.log('valid', isValid, errors)
    if(!isValid) {  // 目前是没有作用的
      const firstError = Object.keys(errors)
      if(firstError.length) {
        that.setData({
          error: errors[firstError[0]].message
        })
      }
    } else {
      // 提交时，如果 三、总体评价 中选择 '不需要跟进'，则删除 四、跟进记录 的数据followUpRecord
      if(that.data.contentData.overallEvaluation && that.data.contentData.overallEvaluation.followUp == 'false') {
        delete that.data.contentData.followUpRecord
      }
      console.log(that.data.contentData)

      // let checkRes = checkRules(this, 'theorySheet')  // 用来检验未填的field
      let checkRes = checkRules(that, evaluationComponentName)  // 用来检验未填的field
      if(!checkRes){ // checkRes为false，即检查到有未填写的field，有err
        return  // 中断
      }

      // 将contentData分解，写入formData
      resolveObj(that.data.contentData, that.data.formData)
      // 修改一些属性的名称
      that.data.formData.course_name = that.data.formData.name
      that.data.formData.class_id = that.data.formData.id
      that.data.formData.course_setupUnit = that.data.formData.setupUnit
      delete that.data.formData.name; delete that.data.formData.id; delete that.data.formData.setupUnit

      // 有问题的，因为这份表可能要交到几个部门去根据他们的身份去填写修改表
      // this.dealTime()
      dealTimeFormat(that.data.formData)
      console.log(that.data.formData)
      $api.submitForm(that.data.formData)
        .then(res => {
          console.log(res)
          wx.showToast({
            title: '提交成功!',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1,
          })
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        })
    }
  })
}

module.exports = {
  resolveObj,
  dealTimeFormat,
  storeComponentsFields,
  checkRules,
  dealAndSubmitForm
}