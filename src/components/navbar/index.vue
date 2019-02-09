<template>
  <div class="navbar">
    <van-tabbar
      fixed
      v-model="active"
      active-color="#07c160"
      @change="onChange"
      :active="active"
    >
      <van-tabbar-item icon="home-o" key="home">主页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" key="chat">微聊</van-tabbar-item>
      <van-tabbar-item icon="add-o" key="up">发布</van-tabbar-item>
      <van-tabbar-item icon="manager-o" key="me">我</van-tabbar-item>
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
      console.log(event.key)

      // this.active = event.mp.detail
      // console.log(event.mp.detail)
      // console.log(this.active)
    }
  }
}
</script>
