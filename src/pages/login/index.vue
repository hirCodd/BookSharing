<template>
  <div class="login">
    <van-button 
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
      class="wxlogin" 
      custom-class="inner-wx-login" 
      type="default">微信用户默认登陆
    </van-button>
    <van-button class="phone-login" custom-class="inner-phone-login" type="default">手机用户登陆</van-button>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      code: '',
      userList: []
      // isLogin: wx.canIUse('button.open-type.getUserInfo') // 判断是否登录，默认未登陆
    }
  },
  onLaunch () {
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  },
  mounted () {
    this.getUserLogin()
  },
  methods: {
    // 改变用户登陆状态
    ...mapMutations(['changeStatus', 'changeLoginStatus']),
    getUserLogin () {
      const that = this
      // 获取用户的信息的方式登录微信
      wx.login({
        success (res) {
          if (res.code) {
            // 获取用户登陆信息
            console.log('微信用户登陆成功')
            // 将获取到code传给后端
            that.code = res.code
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail () {
          // 失败处理
        }
      })
    },
    bindGetUserInfo (e) {
      const that = this
      if (e.mp.detail.rawData) {
        let { encryptedData, userInfo, iv } = e.mp.detail
        that.$fly.post('/get/params', {
          code: that.code,
          encryptedData,
          iv
        }).then(res => {
          userInfo.openId = res.openid
          that.userList = userInfo
          that.$fly.post('/user/register', {
            data: userInfo
          })
          // 将登陆状态改为true
          that.changeLoginStatus(true)
          console.log(userInfo)
          that.changeStatus(userInfo)
          console.log('后台交互拿回数据:', res)
          // 返回上一页
          wx.navigateBack({
            delta: 1
          })
        })
      } else {
        wx.showToast({
          title: '获取权限失败',
          icon: 'error',
          duration: 2000
        })
      }
    }
    /**
     * @description:
     * @param {type}
     * @return:
     */
    // wxGetUserInfo (code) {
    //   const that = this
    //   if (wx.canIUse('button.open-type.getUserInfo')) {
    //     wx.getUserInfo({
    //       withCredentials: true,
    //       success (res) {
    //         let { encryptedData, userInfo, iv } = res
    //         that.$fly.post('/user/register', {
    //           code,
    //           encryptedData,
    //           iv
    //         }).then(res => {
    //           console.log('后台交互拿回数据:', res)
    //           // 返回上一页
    //           wx.navigateBack({
    //             delta: 1
    //           }).catch(err => {
    //             console.log('自动请求api失败err:', err)
    //           })
    //         })
    //       },
    //       fail (err) {
    //         // 获取用户信息失败后
    //         console.log('自动wx.getUserInfo失败:', err)
    //         // 显示主动授权的button
    //         // this.buttonVisible = true
    //       }
    //     })
    //   } else {
    //     console.log('请升级微信版本')
    //   }
    // },
    // getWxUserInfo () {
    //   if (wx.canIUse('button.open-type.getUserInfo')) {
    //     console.log(this.isLogin)
    //   } else {
    //     console.log('请升级微信版本')
    //   }
    // },
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
