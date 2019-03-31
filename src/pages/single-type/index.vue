<template>
  <div class="container">
    <div class="publish-title">

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
        @click="submitBookInfo"
        round
        type="default">圆形按钮
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: 'ssss',
      bookInfo: {
        userName: 'ssss',
        phone: 'fafa',
        address: '',
        bookName: '',
        bookPrice: '',
        bookDesc: ''
      }
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      var that = this
      console.log(that.userName)
      console.log(that.bookInfo.userName)
    },
    submitBookInfo () {
      console.log(this.bookInfo)
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
    changeAddress (e) {
      this.bookInfo.address = e.mp.detail
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


<style scoped>
.publish-user-info {
  width: 100%;
  margin-top: 20rpx;
}
.publish-book-info {
  width: 100%;
  margin-top: 20rpx;
}
</style>
