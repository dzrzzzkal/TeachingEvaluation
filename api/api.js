// import request from '../utils/request'
const request = require('../utils/request')

var api = {}

// 封装get post请求，好像没必要
// 参考：https://blog.csdn.net/w001yy/article/details/89361729
api.get = (url, data, header) => request('GET', url, data, header)
api.post = (url, data) => request('POST', url, data, {'content-type': 'application/x-www-form-urlencoded'})

// 封装具体功能的api
// api.doLogin = (data, header) => request('POST', '/doLogin', data, header)
api.doLogin = (data) => api.post('/doLogin', data)
api.checkToken = (data) => api.post('/checkToken', data)
api.getCourses = (schoolYear, semester) => api.get(`/getCourses?schoolYear=${schoolYear}&semester=${semester}`)
api.searchClass = (name) => api.get(`/class?name=${name}`)
api.getClass = (classid) => api.get(`/classid/${classid}`)
api.submitForm = (data) => api.post('/submitForm', data)
api.getEvaluationProgress = () => api.get('/getEvaluationProgress')
api.getSubmittedSheetsList = () => api.get('/getSubmittedSheetsList')
api.evaluationSheet = (sheet_id) => api.get(`/evaluationSheet/${sheet_id}`)

module.exports = api