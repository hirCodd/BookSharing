<template>
  <div class="container">
    <div class="publish-title">
      <h4>发布单本书</h4>
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
          autosize
          label="书籍描述"
          type="textarea"
          placeholder="请输入书籍描述"
          @change="changeBookDesc"
        />
        <van-field
          autosize
          disabled
          label="上传图片"
        />
        <div class="weui-uploader__bd">
          <div class="weui-uploader__files" id="uploaderFiles">
            <block v-for="item in files" :key="index">
              <div class="weui-uploader__file" @click="predivImage" :id="item">
                <image class="weui-uploader__img" :src="item" mode="aspectFill" />
              </div>
            </block>
          </div>
          <div class="weui-uploader__input-box">
            <div class="weui-uploader__input" @click="chooseImage"></div>
          </div>
        </div>
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
    },
    submitBookInfo () {
      const that = this
      // 提交到api
      that.$fly.post('/publish/single', {
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
    chooseImage (e) {
      var _this = this
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
        }
      })
    },
    predivImage (e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
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
