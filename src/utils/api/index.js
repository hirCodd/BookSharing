/*
 * @Description: api request
 * @Author: finen
 * @Date: 2019-03-25 00:11:29
 * @LastEditTime: 2019-03-31 21:55:25
 */

// import Vue from 'vue'
// const Fly = require('flyio/dist/npm/wx')
// const fly = new Fly()
// fly.config.timeout = 10000 // 超时
// fly.config.baseURL = global.BASEURL // 基地址,配置在一个文件中。
// fly.config.params = {} // 设置公共参数
// fly.config.headers = {'Content-Type': 'application/json'} // 公共请求头

// Vue.prototype.$http = fly
// fly.prototype.$http = 'http://wexapp.free.idcfengye.com/api/v1/'
// export default fly

import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
// Vue.prototype.$http=fly
const host = 'http://127.0.0.1:5000/api/v1/'
// const host = 'http://wexapi.free.idcfengye.com/api/v1/'
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  console.log(request)
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json'
  }

  let authParams = {
    // 公共参数
    // "categoryType": "SaleGoodsType@sim",
    // "streamNo": "wxapp153570682909641893",
    // "reqSource": "MALL_H5",
    // "appid": "string",
    // "timestamp": new Date().getTime(),
    // "sign": "string"
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.body = {
    ...request.body,
    ...authParams
  }
  return request
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data // 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    if (err.status === 0) {
      return '网络连接异常'
    } else if (err.status === 1) {
      return '网络连接超时'
    } else if (err.status === 401) {
      return '用户未登录'
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    }
  }
)

fly.config.baseURL = host

export default fly
