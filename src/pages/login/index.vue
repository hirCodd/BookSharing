<template>
  <div class="login">
    <van-button 
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
      class="wxlogin" 
      custom-class="inner-wx-login" 
      type="default">微信用户默认登陆
    </van-button>
    <van-button 
      class="phone-login" 
      custom-class="inner-phone-login" 
      type="default">手机用户登陆
    </van-button>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      userList: []
      // isLogin: wx.canIUse('button.open-type.getUserInfo') // 判断是否登录，默认未登陆
    }
  },
  onLaunch () {
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData'])
  },
  mounted () {
    // this.getUserLogin()
  },
  methods: {
    // 改变用户登陆状态
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData']),
    bindGetUserInfo (e) {
      const that = this
      let { encryptedData, userInfo, iv } = e.mp.detail
      wx.login({
        success (res) {
          if (res.code) {
            // 获取用户登陆信息
            console.log('微信用户登陆成功')
            // 将获取到code传给后端
            that.code = res.code
            that.$fly.post('/get/params', {
              code: that.code
            }).then(res => {
              userInfo.openId = res.openid
              // 验证用户是否已经注册过
              that.$fly.post('/user/verify', {
                open_id: res.openid
              }).then(res => {
                // 判断微信用户是否之前注册过，注册过则直接登录
                if (res.user_data != null) {
                  // 用户数据不为空，则直接登录
                  that.$fly.post('/user/login', {
                    user_id: res.user_data[0].user_id
                  }).then(
                    // 由于小程序限制,只能讲数据存入到Storage
                    wx.setStorage({
                      key: 'user_id',
                      data: res.user_data[0].user_id
                    }),
                    that.changeLoginStatus(true),
                    that.changeStatus(userInfo),
                    that.changeUserData(res.user_data[0].user_id),
                    wx.navigateBack({
                      delta: 1
                    })
                  )
                  wx.showToast({
                    title: '用户正在登陆',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  that.$fly.post('/user/register', {
                    data: userInfo
                  }).then(res => {
                    that.$fly.post('/user/login', {
                      user_id: res.user_id
                    }).then(
                      // 登陆之后都要将保存在vuex的数据保存
                      wx.setStorage({
                        key: 'user_id',
                        data: res.user_data[0].user_id
                      }),
                      that.changeLoginStatus(true),
                      that.changeStatus(userInfo),
                      that.changeUserData(res.user_id), // 仅保存当前用户数据
                      wx.navigateBack({
                        delta: 1
                      })
                    )
                  })
                  wx.showToast({
                    title: '用户正在登陆',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail () {
          // 失败处理
        }
      })
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
