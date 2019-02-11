<template>
  <div class="container">
    <div class="publish-type">
      <div class="single-book">
        <van-button 
          round 
          plain
          type="default"
          send-message-path
          @click="onClickSingle"
          >发布单本书
        </van-button>
      </div>
      <div class="many-book">
        <van-button 
          round 
          type="default"
          @click="onClickMany"
          >发布多本书
          </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  method: {
    onClickSingle () {
      console.log('sss')
    },
    onClickMany () {
      console.log('sssss')
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