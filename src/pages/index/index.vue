<template>
  <div class="container">
    <p>hello</p>
    <van-button>测试</van-button>
    <van-search  placeholder="请输入搜索关键词" />
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
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
