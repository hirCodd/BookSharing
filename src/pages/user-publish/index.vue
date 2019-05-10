<template>
  <div class="container">
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
         <!-- <view slot="footer">
          <van-row>
          <van-col span="12">
            <van-icon name="like-o" />
            加入心愿书单
          </van-col>
          <van-col span="12">
            {{item.wish_num}}人想要
          </van-col>
        </van-row>
        </view> -->
      </van-panel>
      <!-- <div class="show" v-for="item in list">
        {{item}}
      </div> -->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      userId: '',
      list: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData'])
  },
  onLoad () {
    this.queryUserPublishBook()
  },
  mouted () {
    // this.queryUserPublishBook()
  },
  methods: {
    // 改变用户登陆状态
    ...mapGetters(['userInfo', 'isLogin', 'userData']),
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData']),
    queryUserPublishBook () {
      try {
        const value = wx.getStorageSync('user_id')
        this.$fly.get('/books/own', {
          user_id: value
        }).then(res => {
          this.temp = res
          this.list = res
          for (let i = 0; i < this.temp.length; i++) {
            this.list[i].book_img_url = this.temp[i].book_img_url.split(',')[0]
          }
        })
      } catch (e) {
        console.log('Storage not exist!')
      }
    }
  }
}
</script>

<style scoped>
.list-content {
  width: 90%;
  margin-top:5px;
}

.card-list {
  margin-top: 5px;
}
</style>
