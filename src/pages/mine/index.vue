<template>
  <div class="container">
    <!-- 
    默认未不登录状态
      1.如果用户未授权，就不能登陆，跳转到另一个页面进行微信授权登陆
      2.如果用户已经登陆，直接显示用户的头像名称即可
    -->
    
    <div class="selfinfo">
      <van-card 
        v-if="isLogin"
        :title="userInfos.nick_name"
        :desc="userInfos.user_sign"
        :thumb="userInfos.user_pic"
      />
      <van-card 
        v-else
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
          <van-cell title="我发布的" v-if="isLogin" is-link @click="onClickPublish"/>
          <van-cell title="我发布的" v-else is-link/>
          <van-cell title="我的购物车" v-if="isLogin" is-link @click="onClickGetGoodsCar"/>
          <van-cell title="我的购物车" v-else is-link/>
          <!-- <van-cell title="我卖出的" value="20条" is-link @click="onClickSell"/>
          <van-cell title="我买到的" value="20条" is-link @click="onClickGet"/>
          <van-cell title="我的心愿书单" value="20条" is-link @click="onClickWish"/> -->
        </van-cell-group>
      </div>

      <!-- 设置信息 -->
      <div class="settings">
        <van-cell-group>
          <!-- <van-cell title="设置" is-link @click="onClickSettings"/> -->
          <van-cell title="设置" v-if="isLogin" is-link @click="onClickSettings"/>
          <van-cell title="设置" v-else is-link/>
          <!-- <van-cell title="帮助与反馈" is-link @click="onClickFaq"/> -->
          <van-cell title="帮助与反馈" v-if="isLogin" is-link @click="onClickFaq"/>
          <van-cell title="帮助与反馈" v-else is-link/>
          <van-cell title="退出登录" v-if="isLogin" is-link @click="onClickClean"/>
          <van-cell title="退出登录" v-else is-link/>
        </van-cell-group>
      </div>
    </div>
    <AuthLogin></AuthLogin>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../../store/index.js'
export default {
  data () {
    return {
      bookLength: '',
      user_id: ''
    }
  },
  onShow () {
  },
  onLoad () {
  },
  create () {
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData', 'userInfos'])
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData', 'changeUserInfo']),
    getInfo () {
      var url = '/pages/login/main'
      wx.navigateTo({url})
    },
    onClickPublish () {
      wx.navigateTo({
        url: '/pages/user-publish/main'
      })
    },
    onClickGetGoodsCar () {
      wx.navigateTo({
        url: '/pages/goods-car/main'
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
      this.user_id = store.state.user.userData
      let that = this
      wx.showModal({
        title: '提示',
        content: '是否退出登陆？',
        success (res) {
          if (res.confirm) {
            that.$fly.post('/user/logout', {
              user_id: that.user_id
            })
            that.changeLoginStatus(false) // 设置用户登陆登陆状态为false
            that.changeUserData('') // 设置用户的userId为空
            that.changeStatus('')
            that.changeUserInfo('') // 退出则将所有用户信息清空
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