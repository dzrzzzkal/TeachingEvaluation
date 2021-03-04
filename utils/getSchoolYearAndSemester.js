const schoolYearList = ['2018-2019年', '2019-2020年', '2020-2021年', '2021-2022年', '2022-2023年', '2023-2024年', '2024-2025年']
const semesterList = ['春季学期', '夏季学期', '秋季学期']

const getSchoolYearAndSemester = () => {
  // 根据当前日期设置学年和学期
  let thisYear = new Date().getFullYear()
  let thisMonth = new Date().getMonth() + 1
  for(let i in schoolYearList) {
    let year = parseInt(schoolYearList[i].substring(0, 4))
    if(thisYear === year) {
      // 设置学期 semesterList: ['春季学期', '夏季学期', '秋季学期'],
      let semesterIndex
      if(thisMonth <= 2 || thisMonth >= 9) {  // 秋季学期
        semesterIndex = 2
      }else if(thisMonth >= 3 && thisMonth <= 6) {  // 春季学期
        semesterIndex = 0
      }else if(thisMonth >= 7 && thisMonth <= 8) {  // 夏季学期
        semesterIndex = 1
      }
      // 本校学年学期。以本人课表为例(2021.02-2021.06，属于2020-2021春季学期，2020.09-2021.01属于2020-2021秋季学期，2018.07属于2018-2019夏季学期)
      return{
        schoolYearIndex: semesterIndex !== 0 ? i : i - 1,
        schoolYear: semesterIndex !== 0 ? schoolYearList[i] : schoolYearList[i - 1],
        thisSchoolYear: semesterIndex !== 0 ? schoolYearList[i] : schoolYearList[i - 1],
        semesterIndex: semesterIndex,
        semester: semesterList[semesterIndex],
        thisSemester: semesterList[semesterIndex],

        tempSchoolYearIndex: semesterIndex !== 0 ? i : i - 1, // 为了schoolYear&semester scroll显示当前选择的schoolYear&semester
        tempSemesterIndex: semesterIndex
      }
    }
  }
}

module.exports = {schoolYearList, semesterList, getSchoolYearAndSemester}