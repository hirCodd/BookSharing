<template>
  <div class="container">
    <div class="publish-type">
      <div class="single-book">
        <van-button
          v-if="isLogin"
          round
          plain
          send-message-path
          @click="onClickSingle"
          >发布单本书
        </van-button>
        <van-button 
          v-else
          round
          plain
          send-message-path
          @click="showLogin"
          >发布单本书
        </van-button>
      </div>
      <div class="many-book">
        <van-button
          v-if="isLogin"
          round 
          type="default"
          @click="onClickMany"
          >发布多本书
        </van-button>
        <van-button
          v-else
          round 
          type="default"
          @click="showLogin"
          >发布多本书
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import store from '../../store/index.js'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData'])
  },
  methods: {
    onClickSingle () {
      wx.navigateTo({
        url: '/pages/single-type/main'
      })
    },
    onClickMany () {
      wx.navigateTo({
        url: '/pages/many-type/main'
      })
    },
    showLogin () {
      wx.showToast({
        title: '请登录后使用!'
      })
    }
  }
}
</script>

<style scoped>
.publish-type {
  margin-top: 400rpx;
}
.single-book {
  float: left;
}
.many-book {
  float: left;
  margin-left: 30rpx;
}
</style>