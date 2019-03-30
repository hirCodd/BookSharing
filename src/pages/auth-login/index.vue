<template>
  <div class="container">
    <div v-if="isHide">
      <div v-if="canIUse">
        <div class="header">
          <image src="/images/wx_login.png"/>

          <div class="content">
            <div>申请获取以下权限</div>
            <text>获得你的公开信息(昵称，头像等)</text>
          </div>

          <button
            class="bottom"
            type="primary"
            open-type="getUserInfo"
            lang="zh_CN"
            bindgetuserinfo="bindGetUserInfo"
          >授权登录</button>
        </div>
      </div>

      <div v-else>请升级微信版本</div>
    </div>

    <div v-else>
      <div>我的首页内容</div>
    </div>
  </div>
</template>

<script>
export default {
  data: {
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  onLoad: function () {
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  console.log(res.code)
                }
              })
            }
          })
        } else {
          that.setData({
            isHide: true
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 用户按了允许授权按钮
      var that = this
      // 获取到用户的信息了，打印到控制台上看下
      console.log('用户的信息如下：')
      console.log(e.detail.userInfo)
      // 授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      })
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了-返回授权')
          }
        }
      })
    }
  }
}
</script>


<style scoped>
.header {
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 650rpx;
  height: 300rpx;
  line-height: 450rpx;
}

.header image {
  width: 200rpx;
  height: 200rpx;
}

.content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;
}

.content text {
  display: block;
  color: #9d9d9d;
  margin-top: 40rpx;
}

.bottom {
  border-radius: 80rpx;
  margin: 70rpx 50rpx;
  font-size: 35rpx;
}
</style>