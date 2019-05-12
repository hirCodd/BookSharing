<template>
  <div class="container">
    <div class="detail">
      <van-panel title="书籍信息">
        <view class="book-name">书籍名称：{{bookInfos.book_name}}</view>
        <view class="book-desc">书籍描述：{{bookInfos.book_desc}}</view>
        <view class="book-price">书籍价格：￥{{bookInfos.book_price}}</view>
        <view class="book-number">书籍数量：{{bookInfos.book_number}}</view>
      </van-panel>
      <van-panel title="书籍图片">
        <view class="iamges">
          <swiper interval="5000" duration="500" indicatorDots="true" autoplay="true">
            <swiper-item :key="index" v-for="(item, index) in images" class="imagesize">
              <image
                style="width: 150px; height: 150px; background-color: #eeeeee; "
                mode="aspectFill"
                :src="item">
              </image>
            </swiper-item>
          </swiper>
        </view>
      </van-panel>
      <van-panel title="发布者信息">
        <view class="user-name">发布者姓名：{{bookInfos.real_name}}</view>
        <view class="divLine"></view>
        <view class="user-phone">发布者电话：{{bookInfos.user_phone}}</view>
        <view class="divLine"></view>
        <view class="user-region">发布者地区：{{bookInfos.user_province}}/{{bookInfos.user_city}}/{{bookInfos.user_region}}</view>
        <view class="divLine"></view>
        <view class="user-address">发布者地址：{{bookInfos.user_address}}</view>
      </van-panel>
      <van-goods-action>
        <van-goods-action-button v-if="isLogin" text="加入购物车" type="warning" @click="addShopCar" />
        <van-goods-action-button v-else text="加入购物车" type="warning" @click="showLogin"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../../store/index.js'
export default {
  data () {
    return {
      bookInfos: [],
      images: [],
      user_id: '',
      book_id: ''
    }
  },
  onLoad (option) {
    this.getOneBookInfo(option.postid)
    this.book_id = option.postid
    this.user_id = store.state.user.userData
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData', 'userInfos'])
  },
  methods: {
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData', 'changeUserInfo']),
    getOneBookInfo (option) {
      this.$fly.get('/books/getone', {
        id: option
      }).then(res => {
        this.bookInfos = res[0]
        this.images = res[0].book_img_url.split(',')
        for (let index = 0; index < this.images.length; index++) {
          // 将图片进行压缩
          wx.compressImage({
            src: this.images[index], // 图片路径
            quality: 80 // 压缩质量
          })
        }
      })
    },
    addShopCar () {
      // 想购物车车中加入物品
      this.$fly.post('/order/addgoods', {
        user_id: this.user_id,
        book_id: this.book_id
      }).then(res => {
        console.log(res)
      })
    },
    showLogin () {
      wx.showToast({
        title: '请登录后使用!'
      })
    }
  }
}
</script>


<style scoped>
.detail {
  width: 100%;
}
.imagesize{
  display:flex;
  justify-content: center;
}
.divLine{
  background: #E0E3DA;
  width: 100%;
  height: 2rpx;
}
.book-name, .book-price, .book-number, .book-desc{
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}
.user-name, .user-phone, .user-region, .user-address {
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 2px;
}
.book-price {
  color: red;
}
</style>