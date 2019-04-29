/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-29 01:10:12
 * @LastEditTime: 2019-04-29 23:36:06
 */
const config = require('../config/config')
const cosUrl = 'https://' + config.cos_region + '.file.myqcloud.com/files/v2/' + config.cos_appid + '/' + config.cos_bucket_name + config.cos_dir_name

var cosSignatureUrl = config.host + '/v1/qc_cos/config?cos_path=' + config.cos_dir_name

/**
 * @description:  实现文件上传功能
 * @param {type} filePath: 文件路径 fileName: 文件名称
 * @return: 返回上传的路径
 */
function upload(filePath, fileName, that) {
  let data = null
  wx.request({
    url: cosSignatureUrl,
    header: {
      Authorization: 'JWT' + ' ' + that.data.jwt.access_token
    },
    success: function (cosRes) {
      // 获取签名
      var signature = cosRes.data.sign;

      // 头部带上签名，上传文件至COS
      var uploadTask = wx.uploadFile({
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
          var upload_res = JSON.parse(uploadRes.data)
          var files = that.data.files;
          files.push(upload_res.data.source_url);
          that.setData({
            upload_res: upload_res,
            files: files,
            test_image: upload_res.data.source_url
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
