// import request from '../utils/request'
const request = require('../utils/request')

var api = {}

api.doLogin = (data) => request('POST', '/doLogin', data)

module.exports = api