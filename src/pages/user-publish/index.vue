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
        :key="item.id">
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
          <hr>
        </view>
         <view slot="footer">
          <van-row>
            <van-col span="9">
              <van-button type="default" @click="deleteBook(item.id)">删除书籍</van-button>
            </van-col>
            <van-col span="9">
              <van-button type="default" @click="changeInfo(item.id)">更改信息</van-button>
            </van-col>
            <van-col span="6">
              <van-button type="default" v-if="item.is_publish=='True'" @click="changeDownPublishStatus(item.id)">下架</van-button>
              <van-button type="default" v-if="item.is_publish=='False'" @click="changeUpPublishStatus(item.id)">上架</van-button>
            </van-col>
          </van-row>
        </view>
        <hr
      </van-panel>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import store from '../../store/index.js'
export default {
  data () {
    return {
      userId: '',
      list: [],
      temp: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData'])
  },
  onLoad () {
    this.queryUserPublishBook()
  },
  mouted () {
  },
  methods: {
    // 改变用户登陆状态
    ...mapGetters(['userInfo', 'isLogin', 'userData']),
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData']),
    queryUserPublishBook () {
      this.userId = store.state.user.userData
      this.$fly.get('/books/own', {
        user_id: this.userId
      }).then(res => {
        this.temp = res
        this.list = res
        for (let i = 0; i < this.temp.length; i++) {
          this.list[i].book_img_url = this.temp[i].book_img_url.split(',')[0]
        }
      })
    },
    deleteBook (id) {
      // 首先从list中删除书籍，在发送到后端删除
      for (let i = 0; i < this.list.length; i++) {
        if (id == this.list[i].id) { //eslint-disable-line
          this.list.splice(i, 1)
        }
      }
      this.$fly.post('/books/deletebook', {
        user_id: this.userId,
        book_id: id
      }).then(
        wx.showToast({
          title: '删除成功!'
        })
      )
    },
    changeInfo (id) {
      // 根据用户id以及书籍id更新书籍信息
      wx.navigateTo({
        url: '/pages/update-publish/main?postid=' + id
      })
    },
    changeDownPublishStatus (id) {
      // 下架
      for (let i = 0; i < this.list.length; i++) {
        if (id == this.list[i].id) { //eslint-disable-line
          this.list[i].is_publish = 'False'
          console.log(this.list[i].is_publish)
        }
      }
      this.$fly.post('/books/updatestatus', {
        user_id: this.userId,
        book_id: id,
        is_publish: 0 //eslint-disable-line
      }).then(
        wx.showToast({
          title: '下架成功!'
        })
      )
    },
    changeUpPublishStatus (id) {
      // 重新上架
      for (let i = 0; i < this.list.length; i++) {
        if (id == this.list[i].id) { //eslint-disable-line
          this.list[i].is_publish = 'True'
        }
      }
      this.$fly.post('/books/updatestatus', {
        user_id: this.userId,
        book_id: id,
        is_publish: 1 //eslint-disable-line
      }).then(
        wx.showToast({
          title: '上架成功!'
        })
      )
    }
  }
}
</script>

<style>


.card-list {
  margin-top: 5px;
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
