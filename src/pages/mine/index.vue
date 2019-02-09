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
          />
          <van-cell
            title="我卖出的"
            value="20条"
            is-link
          />
          <van-cell
            title="我买到的"
            value="20条"
            is-link
          />
          <van-cell
            title="我的心愿书单"
            value="20条"
            is-link
          />
          </van-cell-group>
      </div>
      
      <!-- 设置信息 -->
      <div class="settings">
        <van-cell-group>
          <van-cell
            title="设置"
            is-link
          />
          <van-cell
            title="帮助与反馈"
            is-link
          />
          </van-cell-group>
      </div>
    </div>
  </div>
</template>

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