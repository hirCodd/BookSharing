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
      <van-panel use-footer-slot>
        <view slot="header">
          <van-card
          num="2"
          price="10.00"
          desc="描述信息"
          title="标题"
          thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
          >
          </van-card>
        </view>
         <view slot="footer">
          <van-row>
          <van-col span="12">
            <van-icon name="like-o" />
            加入心愿书单
          </van-col>
          <van-col span="12">
            666人想要
          </van-col>
        </van-row>
        </view>
      </van-panel>

      <van-panel use-footer-slot>
        <view slot="header">
          <van-card
          num="2"
          price="10.00"
          desc="描述信息"
          title="标题"
          thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
          >
          </van-card>
        </view>
         <view slot="footer">
          <van-row>
          <van-col span="12">
            <van-icon name="like-o" />
            加入心愿书单
          </van-col>
          <van-col span="12">
            666人想要
          </van-col>
        </van-row>
        </view>
      </van-panel>

      <van-panel use-footer-slot>
        <view slot="header">
          <van-card
          num="2"
          price="10.00"
          desc="描述信息"
          title="标题"
          thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
          >
          </van-card>
        </view>
         <view slot="footer">
          <van-row>
          <van-col span="12">
            <van-icon name="like-o" />
            加入心愿书单
          </van-col>
          <van-col span="12">
            666人想要
          </van-col>
        </van-row>
        </view>
      </van-panel>
      <!-- <div class="show" v-for="item in list">
        {{item}}
      </div> -->
    </div>
  </div>
</template>



<style scoped>
.top-search {
  width: 95%;
}
.list-content {
  width: 90%;
  margin-top:5px;
}

.card-list {
  margin-top: 5px;
}
</style>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    // this.getUserInfo()
    this.getData()
    // this.getSetting()
  },
  methods: {
    // 测试连接
    getData () {
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/users',
        body: {}
      }).then(res => {
        console.log(res)
        this.list = res.user
      })
    }
  }
}
</script>
