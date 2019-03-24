/*
 * @Description: api request
 * @Author: finen
 * @Date: 2019-03-25 00:11:29
 * @LastEditTime: 2019-03-25 00:59:43
 */

import Vue from 'vue'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
fly.config.timeout = 10000 // 超时
fly.config.baseURL = global.BASEURL // 基地址,配置在一个文件中。
fly.config.params = {} // 设置公共参数
fly.config.headers = {'Content-Type': 'application/json'} // 公共请求头

Vue.prototype.$http = fly
fly.prototype.$http = 'http://127.0.0.1:5000/api/v1/'
export default fly
