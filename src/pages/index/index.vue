<template>
  <div class="container">
    <!-- 用于显示搜索 -->
    <div class="top-search">
      <van-search
        custom-class="search"
        placeholder="请输入搜索关键词"
        use-action-slot
        bind:search="onSearch"
      >
        <view slot="action" bind:tap="onSearch">搜索</view>
      </van-search>
    </div>
    <!-- 列表 -->
    <div class="list-content">
      <van-panel 
        use-footer-slot   
        custom-class="book-info" 
        header-class="book-info-header" 
        footer-class="book-info-footer"
        v-for="(item, index) in list"
        :key="item.index">
        <view slot="header">
          <van-card
            custom-class="card-info"
            title-class="book-title"
            desc-class="book-desc"
            price-class="book-price"
            num-class="book-num"
            :num="item.book_number"
            :price="item.book_price"
            :desc="item.book_desc"
            :title="item.book_name"
            :thumb="item.book_img_url"
          >
          </van-card>
        </view>
        <hr>
         <view slot="footer">
          <van-row>
          <van-col span="12">
            <van-icon name="like-o" />
            加入心愿书单
          </van-col>
          <van-col span="12">
            {{item.wish_num}}人想要
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

<script>
export default {
  data () {
    return {
      list: [],
      temp: [],
      wish_num: 0
    }
  },
  created () {
  },
  onLoad () {
    this.getData()
  },
  methods: {
    // 测试连接
    getData () {
      const that = this
      that.$fly.get('/books/all', {
      }).then(res => {
        // 解析图片地址
        this.temp = res
        this.list = res
        for (let i = 0; i < this.temp.length; i++) {
          this.list[i].book_img_url = this.temp[i].book_img_url.split(',')[0]
        }
      })
      that.$fly.get('/users', {
      }).then(res => {
        console.log(res)
      })
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0, 8) + '...'
      }
      return value
    }
  }
}
</script>

<style>
.top-search {
  width: 95%;
}
.search {
  padding: 0;
}
.list-content {
  width: 90%;
  margin-top: 5px;
  
}
.card-list {
  margin-top: 5px;
}
.card-info {
  background-color: #fff;
}
.book-title {
  font-size: 16px;
}
.book-desc {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-info {
  padding: 2px;
  background-color:white;
  box-shadow:0px 5px 30px #999;
  /* box-shadow: 0 1px 3px #a5b6c8, 0 1px 2px #a5b6c8; */
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  /* border:1px solid #a5b6c8;background:#fafcfd; */
  margin: 8px 0;
  
}

.book-info-header {

}
.book-price {
  font-size: 12px;
}
.book-num {
  font-size: 12px;
}
.book-info-footer {
  font-size: 14px;
}

</style>