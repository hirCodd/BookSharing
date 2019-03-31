<template>
  <div class="container">
    <!-- 
    默认未不登录状态
      1.如果用户未授权，就不能登陆，跳转到另一个页面进行微信授权登陆
      2.如果用户已经登陆，直接显示用户的头像名称即可
    -->
    
    <div class="selfinfo">
      <van-card v-if="isLogin"
        :title="userInfo.nickName"
        desc="该用户暂时没有介绍..."
        :thumb="userInfo.avatarUrl"
      />
      <van-card v-else
        title="登陆"
        thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
        @click="getInfo"
      />
    </div>
    <!-- <div class="selfinfo">
      
    </div>-->
    <div class="userinfo">
      <!-- 个人销售信息 -->
      <div class="sell-info">
        <van-cell-group>
          <van-cell title="我发布的" value="20条" is-link @click="onClickPublish"/>
          <van-cell title="我卖出的" value="20条" is-link @click="onClickSell"/>
          <van-cell title="我买到的" value="20条" is-link @click="onClickGet"/>
          <van-cell title="我的心愿书单" value="20条" is-link @click="onClickWish"/>
        </van-cell-group>
      </div>

      <!-- 设置信息 -->
      <div class="settings">
        <van-cell-group>
          <van-cell title="设置" is-link @click="onClickSettings"/>
          <van-cell title="帮助与反馈" is-link @click="onClickFaq"/>
          <van-cell title="退出登录" is-link @click="onClickClean"/>
        </van-cell-group>
      </div>
    </div>
    <AuthLogin></AuthLogin>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userInfos: []
    }
  },
  create () {
    // this.getSetting()
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  },
  mounted () {
    this.isLoginFun()
  },
  methods: {
    ...mapMutations(['changeStatus', 'changeLoginStatus']),
    isLoginFun () {
      console.log(this.isLogin)
    },
    getInfo () {
      console.log('test on card')
      var url = '/pages/login/main'
      wx.navigateTo({url})
    },
    // getSetting () {
    //   // var that = this
    //   wx.getSetting({
    //     success: function (res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         wx.getUserInfo({
    //           success: function (res) {
    //             // this.avatar = res.userInfo
    //             console.log(res.userInfo)
    //             // that.avatar = res.u
    //             // 用户已经授权过
    //             console.log('用户已经授权过')
    //           }
    //         })
    //       } else {
    //         console.log('用户还未授权过')
    //       }
    //     }
    //   })
    // },
    onClickPublish () {
      wx.navigateTo({
        url: '/pages/user-publish/main'
      })
    },
    onClickSell () {
      wx.navigateTo({
        url: '/pages/user-selling/main'
      })
    },
    onClickGet () {
      wx.navigateTo({
        url: '/pages/user-get/main'
      })
    },
    onClickWish () {
      wx.navigateTo({
        url: '/pages/user-wish-booklist/main'
      })
    },
    onClickSettings () {
      wx.navigateTo({
        url: '/pages/user-settings/main'
      })
    },
    onClickFaq () {
      wx.navigateTo({
        url: '/pages/user-faq/main'
      })
    },
    // 清除登陆状态
    onClickClean () {
      let that = this
      wx.showModal({
        title: '提示',
        content: '是否退出登陆？',
        success (res) {
          if (res.confirm) {
            that.changeLoginStatus(false)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
</script>


<style scoped>
.selfinfo {
  width: 100%;
}

.userinfo {
  width: 100%;
  margin-top: 20rpx;
}

.settings {
  width: 100%;
  margin-top: 60rpx;
}
</style>