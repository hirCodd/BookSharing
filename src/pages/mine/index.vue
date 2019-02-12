<template>
  <div class="container">
    <div class="selfinfo">
      <van-card
        desc="你的名字"
        title="签名"
        thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
      />
    </div>
    <div class="userinfo">
      <!-- 个人销售信息 -->
      <div class="sell-info">
        <van-cell-group>
          <van-cell
            title="我发布的"
            value="20条"
            is-link
            @click="onClickPublish"
          />
          <van-cell
            title="我卖出的"
            value="20条"
            is-link
            @click="onClickSell"
          />
          <van-cell
            title="我买到的"
            value="20条"
            is-link
            @click="onClickGet"
          />
          <van-cell
            title="我的心愿书单"
            value="20条"
            is-link
            @click="onClickWish"
          />
          </van-cell-group>
      </div>
      
      <!-- 设置信息 -->
      <div class="settings">
        <van-cell-group>
          <van-cell
            title="设置"
            is-link
            @click="onClickSettings"
          />
          <van-cell
            title="帮助与反馈"
            is-link
            @click="onClickFaq"
          />
          </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
    }
  }
}
</script>


<style scoped>
.selfinfo {
  width: 100%
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