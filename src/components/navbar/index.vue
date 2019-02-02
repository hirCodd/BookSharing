<template>
  <div class="navbar">
    <van-tabbar
      active="{ active }"
      active-color="#07c160"
      @change="onChange"
    >
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">微聊</van-tabbar-item>
      <van-tabbar-item icon="add-o">发布</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onChange (event) {
      console.log('ss')
    }

  }
}
</script>
