/**
 * 
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 */
const formInputChange = (e, that) => {
  const {field} = e.currentTarget.dataset // 要传递的对象中的属性名
  that.setData({
    [field]: e.detail.value
  })
  let obj = { [field]: that.data[field] }
  that.triggerEvent('inputChange', obj)
}

/**
 * 
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 */
// 下面initRadioGroupData一定要输入名字，因为是组件attach时创建，没有e，这里考虑要不要也像下面一样直接输入名字，修改一下，然后可以删除元素节点中的data-，有了名字可以简化一下下面的代码。
const formRadioGroupChange = (e, that) =>{
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

  // 传值给父组件
  let obj = { [field]: that.data[field] }
  that.triggerEvent('radioChange', obj)
}

/**
 * 
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} field 存储数据的数组的名字
 * @param {string} fielddata 填充radiogroup的文字说明内容的数组的名字
 * @param {string} radioitems 填充radiogroup中包含的所有radio的值的数组的名字
 */
// 目前的代码是仿照上面的，其实有了名字可以更简化，待修改
const initRadioGroupData = (that, field, fielddata, radioitems) => {
  const f = that.data[field]
  const fdata = that.data[fielddata]  // 数组
  const items = that.data[radioitems]  // fdata数组的第index个元素中的radioitems属性的值，是一个数组
  console.log(items)
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
 * 
 * @param {*} e 触发的事件
 * @param {*} that 调用此方法的自定义组件的this
 * @param {string} obj 存入的对象的名称
 */
const getFormChange = (e, that, obj) => {
  let input = e.detail  // input是只包含一个属性的对象
  console.log(input)
  for(let i in input) {
    that.setData({
      [`${obj}.${i}`]: input[i]
    })
  }
}

module.exports = {
  formInputChange,
  formRadioGroupChange,
  initRadioGroupData,
  getFormChange
}
