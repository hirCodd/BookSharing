<template>
  <div class="container">
    <!-- 用于显示搜索 -->
    <div class="top-search">
      <van-search
        placeholder="请输入搜索关键词"
        use-action-slot
        bind:search="onSearch"
      >
        <view slot="action" bind:tap="onSearch">搜索</view>
      </van-search>
    </div>
    <!-- 列表 -->
    <div class="list-content">
      <i-card title="名称" extra="5元/本" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <view slot="content">内容不错</view>
        <view slot="footer">尾部内容</view>
      </i-card>

      <van-card
        num="2"
        tag="标签"
        price="10.00"
        desc="描述信息"
        title="标题"
        thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
      >
        <view slot="footer">
          <view>xx人喜欢</view>
        </view>
      </van-card>
    </div>
    <!-- 底部导航栏 -->
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/navbar/index'
export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
.top-search {
  width: 80%;
}
.list-content {
  width: 90%;
  margin-top:10px;
}

.card-list {
  margin-top: 5px;
}
</style>
