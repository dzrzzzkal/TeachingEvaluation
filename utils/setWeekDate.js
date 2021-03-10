var clen = 7  // 要设置的单元格数量(即 一周天数)
//表示当前已经点击到的日期
// var currentFirstDate;
//格式化日期
var formatDate = function(date){
  var year = date.getFullYear() + '年'
  var month = (date.getMonth() + 1) + '月'
  var day = date.getDate()  // + '日'
  var week = '(' + ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()] + ')'
  // return year + month + day + ' ' +week
  return day
}
/*
  * 日期加上指定的天数，使用的是DATE类本身自带的方法，当第二个参数为负数的时候进行减法运算
  * 这样可以避免自己写的方法会出现错误
  * 需要注意的是，此方法中的setDate并不是自定义的方法，而是Date对象自带的方法
  */
var addDate= function(date, n){      
  date.setDate(date.getDate() + n)
  return date
}
/*
  * 设置日期，并未单元格进行赋值
  */
var getDate = function(date){             
  let weekday = date.getDay()
  var week = (weekday === 0 ? 7 : weekday) - 1
  date = addDate(date, week *-1)
  // currentFirstDate = new Date(date);
  let dateArr = []
  for(var i = 0; i < clen; i++){  //循环赋值          
    // console.log(formatDate(i==0 ? date : addDate(date,1)))
    dateArr.push(formatDate(i == 0 ? date : addDate(date, 1)))
  }
  return dateArr
}

// 输入new Date()格式的参数
const getThisWeekDate = (year, month, day) => {
  let date = new Date(year, month, day)
  return getDate(date)
  // return getDate(new Date())
}

const getLastWeekDate = (year, month, day) => {
  let date = new Date(year, month, day)
  return getDate(addDate(date, -7))
  // return getDate(addDate(currentFirstDate, -7))
}

const getNextWeekDate = (year, month, day) => {
  let date = new Date(year, month, day)
  return getDate(addDate(date, 7))
  // return getDate(addDate(currentFirstDate, 7))
}

module.exports = {
  getThisWeekDate,
  getLastWeekDate,
  getNextWeekDate
}