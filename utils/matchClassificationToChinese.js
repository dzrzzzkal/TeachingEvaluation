const matchClassification = (classification) => {
  switch (classification) {
    case 'theory':
      classification = '理论课'
      break;
    case 'student report':
      classification = '学生汇报课'
      break;
    case 'experiment':
      classification = '实验课'
      break;
    case 'PE':
      classification = '体育课'
      break;
    case 'theory of public welfare':
      classification = '公益课程理论讲授'
      break;
    case 'practice of public welfare':
      classification = '公益课程服务实践'
      break;
    default:
      classification = 'error'
      break;
  }
  return classification
}

const matchSheetTitle = (classification) => {
  let title
  switch (classification) {
    case 'theory':
      title = '汕头大学听课记录表（理论课适用）'
      break;
    case 'student report':
      title = '汕头大学听课记录表（学生汇报课适用）'
      break;
    case 'experiment':
      title = '汕头大学听课记录表（实验课适用）'
      break;
    case 'PE':
      title = '汕头大学听课记录表（体育课适用）'
      break;
    case 'theory of public welfare':
      title = '汕头大学听课记录表（公益课程理论讲授适用）'
      break;
    case 'practice of public welfare':
      title = '汕头大学听课记录表（公益课程服务实践适用）'
      break;
    default:
      title = 'error'
      break;
  }
  return title
}

module.exports = {matchClassification, matchSheetTitle}