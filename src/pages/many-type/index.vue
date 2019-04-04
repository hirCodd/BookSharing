<template>
  <div class="container">
    <div class="publish-title">
      <h4>发布多本书</h4>
    </div>
    <div class="publish-user-info">
      <van-cell-group>
        <van-field
          label="联系人姓名"
          placeholder="请输入联系人姓名"
          :value="userName"
          @change="changeUserName"
        />
        <van-field
          label="电话号码"
          placeholder="请输入电话号码"
          @change="changePhone"
        />
        <van-field
          label="联系人所在省"
          placeholder="请输入联系人地址"
          @change="changeProvince"
        />
        <van-field
          label="联系人城市"
          placeholder="请输入联系人地址"
          @change="changeCity"
        />
        <van-field
          label="联系人区县"
          placeholder="请输入联系人地址"
          @change="changeRegion"
        />
        <van-field
          label="联系人地址"
          placeholder="请输入联系人地址"
          @change="changeAddress"
        />
      </van-cell-group>
    </div>
    <div class="publish-book-info">
      <van-cell-group>
        <van-field
          label="书籍名称"
          placeholder="请输入书籍名称"
          @change="changeBookName"
        />
        <van-field
          label="书本价格"
          placeholder="请输入书本价格"
          @change="changeBookPrice"
        />
         <van-field
          label="书籍本数"
          placeholder="请输入书籍本数"
          @change="changeBookNum"
        />
        <van-field
          autosize
          label="书籍描述"
          type="textarea"
          placeholder="请输入书籍描述"
          @change="changeBookDesc"
        />
      </van-cell-group>
    </div>
    <div class="submit-button">
      <van-button
        custom-class="submit-custom"
        @click="submitBookInfo"
        round
        type="default">提交
      </van-button>
    </div>
  </div>
</template> 

<script>
export default {
  data () {
    return {
      bookInfo: {
        userName: '',
        phone: '',
        province: '',
        city: '',
        region: '',
        address: '',
        bookName: '',
        bookPrice: '',
        bookDesc: '',
        bookNum: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    submitBookInfo () {
      const that = this
      // 提交到api
      that.$fly.post('/publish/many', {
        data: that.bookInfo
      }).then(res => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '是否确定发布？',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      })
    },
    /**
     * 以下函数用于监听数据变化
     * @param e
     */
    changeUserName (e) {
      this.bookInfo.userName = e.mp.detail
    },
    changePhone (e) {
      this.bookInfo.phone = e.mp.detail
    },
    changeProvince (e) {
      this.bookInfo.province = e.mp.detail
    },
    changeCity (e) {
      this.bookInfo.city = e.mp.detail
    },
    changeRegion (e) {
      this.bookInfo.region = e.mp.detail
    },
    changeAddress (e) {
      this.bookInfo.address = e.mp.detail
    },
    changeBookNum (e) {
      this.bookInfo.bookNum = e.mp.detail
    },
    changeBookName (e) {
      this.bookInfo.bookName = e.mp.detail
    },
    changeBookPrice (e) {
      this.bookInfo.bookPrice = e.mp.detail
    },
    changeBookDesc (e) {
      this.bookInfo.bookDesc = e.mp.detail
    }
  }
}
</script>


<style>
.publish-user-info {
  width: 100%;
  margin-top: 20rpx;
}
.publish-book-info {
  width: 100%;
  margin-top: 20rpx;
}
.submit-custom {
  margin-top: 40rpx;
}
</style>
