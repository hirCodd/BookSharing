<template>
  <div class="login">
    <van-button 
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo" 
      @click="getWxUserInfo" 
      class="wxlogin" 
      custom-class="inner-wx-login" 
      type="default">微信用户默认登陆
    </van-button>
    <van-button class="phone-login" custom-class="inner-phone-login" type="default">手机用户登陆</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      isLogin: wx.canIUse('button.open-type.getUserInfo') // 判断是否登录，默认未登陆
    }
  },
  onLaunch () {
    this.getUserLogin()
  },
  methods: {
    getUserLogin () {
      // 获取用户的信息的方式登录微信
      wx.login({
        success (res) {
          if (res.code) {
            // 获取用户登陆信息
            console.log('微信用户登陆成功')
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    getWxUserInfo () {
      if (wx.canIUse('button.open-type.getUserInfo')) {
        console.log(this.isLogin)
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (e) {
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户允许授权')
        this.userList = JSON.parse(e.mp.detail.rawData)
        // 向服务端发送用户信息
        this.$fly.post('/user/register', {
          data: this.userList
        }).then(res => {
          // 返回上一页
          wx.navigateBack({
            delta: 1
          })
        })
      } else {
        // 用户按了拒绝按钮
        wx.showToast({
          title: '获取权限失败',
          icon: 'error',
          duration: 2000
        })
      }
    }
  }
}
</script>


<style>
.login {
  width: 100%;
  margin-top: 300rpx;
}
.inner-wx-login {
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-direction:row;
  align-items:center;
}
.inner-phone-login{
  margin-top: 5px;
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-direction:row;
  align-items:center;
}

</style>
