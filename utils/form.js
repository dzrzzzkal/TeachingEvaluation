const gradeItems = [
  {value: '优+', name: '优+'},
  {value: '优', name: '优'},
  {value: '优-', name: '优-'},
  {value: '良+', name: '良+'},
  {value: '良', name: '良'},
  {value: '良-', name: '良-'},
  {value: '中+', name: '中+'},
  {value: '中', name: '中'},
  {value: '中-', name: '中-'},
  {value: '合格+', name: '合格+'},
  {value: '合格', name: '合格'},
  {value: '合格-', name: '合格-'},
  {value: '不合格+', name: '不合格+'},
  {value: '不合格', name: '不合格'},
  {value: '不合格-', name: '不合格-'},
  {value: '不适用+', name: '不适用+'},
  {value: '不适用', name: '不适用'},
  {value: '不适用-', name: '不适用-'},
]

/**
 * input的值改变。后传给父组件。
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} objname 将发送给父组件的数据包在某个对象中，objname为该对象的名字，一般用自定义组件的名称
 */
const formInputChange = (e, that, objname) => {
  const {field} = e.currentTarget.dataset // 要传递的对象中的属性名
  that.setData({
    [field]: e.detail.value
  })
  // 传值给父组件
  let obj = { [`${objname}.${field}`]: that.data[field] }
  that.triggerEvent('inputChange', obj)
}

const initFormInput = () =>{

}

/**
 * 子组件使用。某个radiogroup的通过点击触发事件，改变值，然后传给父组件。
 * @param {*} e 
 * @param {*} that 
 * @param {string} objname 将发送给父组件的数据包在某个对象中，objname为该对象的名字，一般用自定义组件的名称
 */
const radioGroupChange = (e, that, objname) => {
  const {field, fielddata} = e.currentTarget.dataset  // string
  const value = e.detail.value
  const items = that.data[fielddata]
  for(let i = 0, len = items.length; i < len; ++i) {
    items[i].checked = items[i].value === value
  }
  that.setData({
    [fielddata]: items,
    [field]: value
  })
  let obj = { [`${objname}.${field}`]: that.data[field] }
  that.triggerEvent('inputChange', obj)
}

/**
 * radiogroups 中的某个radiogroup通过点击触发事件，值发生改变(PS: 不是单个radio group，是radio groups，包含index)。后传给父组件
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} objname 将发送给父组件的数据包在某个对象中，objname为该对象的名字，一般用自定义组件的名称
 */
// 下面initRadioGroupsData一定要输入名字，因为是组件attach时创建，没有e，这里考虑要不要也像下面一样直接输入名字，修改一下，然后可以删除元素节点中的data-，有了名字可以简化一下下面的代码。
const radioGroupsChange = (e, that, objname) =>{
  const {index, field, fielddata, radioitems} = e.currentTarget.dataset // 全都为string类型
  const fdata = that.data[fielddata]  // 数组
  const items = fdata[index][radioitems]  // fdata数组的第index个元素中的radioitems属性的值，是一个数组
  const value = e.detail.value
  for(let i = 0, len = items.length; i < len; ++i) {
    items[i].checked = items[i].value === value
  }
  that.setData({
    [`${fielddata}[${index}].${radioitems}`]: items,
    [`${field}[${index}]`]: value,
  })
  let obj = { [`${objname}.${field}`]: that.data[field] }
  that.triggerEvent('radioChange', obj)
}

/**
 * 初始化radiogroups，包括设置文字内容fielddata，和设置存储radio groups的数据的数组
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} field 存储数据的数组的名字
 * @param {string} fielddata 填充radiogroup的文字说明内容和checked的数组的名字，这里主要将radioitems初始化填充入数组中的所有元素作为文字说明内容
 * @param {string} radioitems 填充radiogroup中包含的所有radio的值的数组的名字
 */
// 目前的代码是仿照上面的，其实有了名字可以更简化，待修改
const initRadioGroupsData = (that, field, fielddata, radioitems) => {
  const f = that.data[field]
  const fdata = that.data[fielddata]  // 数组
  const items = that.data[radioitems]  // fdata数组的第index个元素中的radioitems属性的值，是一个数组，即radioItems
  for(let i = 0, len = fdata.length; i < len; ++i) {
    // [`${fdata}[${i}].${radioitems}`] = items  // 遍历，设置fdata中的元素[radioitems]为items数组
    fdata[i][radioitems] = items
    f.push('') // 设置数组长度
  }
  that.setData({
    [fielddata]: fdata,
    [field]: f
  })
}

/**
 * 父组件接受子组件传来的值后，写入自身数据objname中
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} objname 存入的对象的名称
 */
const setFormChange = (e, that, objname) => {
  let input = e.detail  // input是只包含一个属性的对象
  for(let i in input) {
    that.setData({
      [`${objname}.${i}`]: input[i]
    })
  }
}

/**
 * 输入value，设置某个radiogroup选定某个radio，即初始化设定值。后传给父组件
 * @param {string} value 该radio group要set的值value
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} field 存储数据的名字
 * @param {string} fielddata 包含radiogroup的文字说明内容和checked的数组的名字，这里主要用于修改checked
 * @param {string} objname 将发送给父组件的数据包在某个对象中，objname为该对象的名字，一般用自定义组件的名称
 */
const setRadioGroupChange = (value, that, field, fielddata, objname) => {
  const items = that.data[fielddata]
  for(let i = 0, len = items.length; i < len; ++i) {
    items[i].checked = items[i].value === value
  }
  that.setData({
    [fielddata]: items,
    [field]: value
  })
  let obj = { [`${objname}.${field}`]: that.data[field] }
  that.triggerEvent('inputChange', obj)
}


/**
 * 判断 二、评价 中的值(数组)中第一个未填的值，用于提醒用户未填的题号
 * @param {array} evaluationList 
 */
const judgeEvaluationListRule = (evaluationList) => {
  let i = 1 // 题号，应为下标+1，所以初始值为1
  for(let item of evaluationList) {
    if(!item) {
      return i  // 返回值为''的第一个题号
    }
    i++
  }
}

module.exports = {
  formInputChange,
  radioGroupChange,
  radioGroupsChange,
  initRadioGroupsData,
  setFormChange,
  setRadioGroupChange,

  judgeEvaluationListRule,
}
