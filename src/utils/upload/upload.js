/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 01:10:12
 * @LastEditTime: 2019-04-30 00:55:44
 */
const config = require('../config/config')
const cosUrl = 'https://' + config.cos_bucket_name + '.cos.' + config.cos_region + '.myqcloud.com'
var cosSignatureUrl = config.host + '/get/auths'

/**
 * @description:  实现文件上传功能
 * @param {type} filePath: 文件路径 fileName: 文件名称
 * @return: 返回上传的路径
 */
function upload (filePath, fileName, that) {
  let data = null
  wx.request({
    url: cosSignatureUrl,
    success: function (cosRes) {
      // 获取签名
      let signature = cosRes.data.sign
      // 头部带上签名，上传文件至COS
      let uploadTask = wx.uploadFile({
        url: cosUrl + '/' + fileName,
        filePath: filePath,
        header: {
          'Authorization': signature
        },
        name: 'filecontent',
        formData: {
          op: 'upload'
        },
        success: function (uploadRes) {
          // 上传成功后的操作
          let uploadResponse = JSON.parse(uploadRes.data)
          let files = that.data.files
          files.push(uploadResponse.data.source_url)
          that.setData({
            uploadResponse: uploadResponse,
            files: files,
            test_image: uploadResponse.data.source_url
          })
        },
        fail: function (e) {
          console.log('e', e)
        }
      })
      // 上传进度条
      uploadTask.onProgressUpdate((res) => {
        that.setData({
          upload_progress: res.progress
        })
        if (res.progress === 100) {
          that.setData({
            upload_progress: 0
          })
        }
      })
    }
  })
}
