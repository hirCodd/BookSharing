<template>
  <div class="container">
    <div class="publish-title">
      <h4>发布多本书</h4>
    </div>
    <div class="publish-user-info">
      <van-cell-group>
        <van-field
          label="联系人姓名"
          name="userName"
          placeholder="请输入联系人姓名"
          :value="userName"
          @change="changeUserName"
        />
        <van-field
          label="电话号码"
          name="phone"
          placeholder="请输入电话号码"
          @change="changePhone"
        />
        <van-field
          label="联系人省份"
          name="province"
          placeholder="请输入联系人地址"
          @change="changeProvince"
        />
        <van-field
          label="联系人城市"
          name="city"
          placeholder="请输入联系人地址"
          @change="changeCity"
        />
        <van-field
          label="联系人区县"
          name="region"
          placeholder="请输入联系人地址"
          @change="changeRegion"
        />
        <van-field
          label="联系人地址"
          name="address"
          placeholder="请输入联系人地址"
          @change="changeAddress"
        />
      </van-cell-group>
    </div>
    <div class="publish-book-info">
      <van-cell-group>
        <van-field
          label="书籍名称"
          name="bookName"
          placeholder="请输入书籍名称"
          @change="changeBookName"
        />
        <van-field
          label="书本价格"
          name="bookPrice"
          placeholder="请输入书本价格"
          @change="changeBookPrice"
        />
         <van-field
          label="书籍本数"
          name="bookNum"
          placeholder="请输入书籍本数"
          @change="changeBookNum"
        />
        <van-field
          autosize
          label="书籍描述"
          name="bookDesc"
          type="textarea"
          placeholder="请输入书籍描述"
          @change="changeBookDesc"
        />
        <van-field
          autosize
          disabled
          label="上传图片"
        />
        <div class="weui-uploader__bd th-backwhite clearfix">
          <div class="weui-uploader__files" id="uploaderFiles">
            <block v-for="(item,index) in files" :key="index">
              <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
                <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index)"/>
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
    <div class="th-submit-btn" @click="submitBookInfo">提交</div>
  </div>
</template> 

<script>
import WxValidate from '../../utils/wx-validate/WxValidate.js'
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
      },
      files: [],
      filesOnline: []
    }
  },
  onLoad () {
    this.initValidate()
  },
  mounted () {
  },
  methods: {
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
    },
    submitBookInfo () {
      const that = this
      const params = this.bookInfo
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0].msg
        wx.showModal({
          title: error
        })
      } else {
        // 通过数据校验的数据能够提交到api
        wx.showModal({
          title: '发布提示',
          content: '是否确定发布？',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.$fly.post('/publish/single', {
                data: that.bookInfo
              })
              // 发布成功后自动返回发布页面
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        // that.$fly.post('/publish/single', {
        //   data: that.bookInfo
        // }).then(res => {
        //   // 当用户点击确定之后才真正的想后端发送数据，此处逻辑待修改
        // })
      }
    },
    chooseImage (e) {
      var _this = this
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
          var tempFilePaths = res.tempFilePaths
          // console.log(tempFilePaths)
          wx.uploadFile({
            url: 'http://asdasdasdsadasdasd',
            filePath: tempFilePaths[0],
            name: 'file',
            success: function (res) {
              _this.filesOnline = _this.filesOnline.concat(JSON.parse(res.data).data)
            }
          })
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
    deletImg (index) {
      this.files.splice(index, 1)
      this.filesOnline.splice(index, 1)
    },
    /**
     * @description: 表单校验所需要的所有数据
     */
    initValidate () {
      const rules = {
        userName: {
          required: true,
          minLength: 2
        },
        phone: {
          required: true,
          minLength: 11
        },
        province: {
          required: true
        },
        city: {
          required: true
        },
        region: {
          required: true
        },
        address: {
          required: true
        },
        bookName: {
          required: true
        },
        bookPrice: {
          required: true
        },
        bookNum: {
          required: true
        },
        bookDesc: {
          required: true
        }
      }
      const messages = {
        userName: {
          required: '请输入联系人姓名',
          rangelength: '请输入2~4个汉字个汉字'
        },
        phone: {
          required: '请输入联系人电话号码',
          rangelength: '请输入正确的电话号码'
        },
        province: {
          required: '请输入联系人省份'
        },
        city: {
          required: '请输入联系人城市'
        },
        region: {
          required: '请输入联系人地区'
        },
        address: {
          required: '请输入联系人地址'
        },
        bookName: {
          required: '请输入书籍名称'
        },
        bookPrice: {
          required: '请输入正确的书籍价格'
        },
        bookNum: {
          required: '请输入书籍数量'
        },
        bookDesc: {
          required: '请输入书籍描述'
        }
      }
      this.WxValidate = new WxValidate(rules, messages)
    }
  }
}
</script>


<style>
.th-icon-cancel{
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  right: -14rpx;
  top: -14rpx;
}
.weui-uploader__input-box{
  margin-right: 0;
}
.weui-uploader__bd{
  margin-bottom: 0;
}
.posi-rela{
  position: relative;
  overflow: visible;
}
.weui-uploader__file:nth-child(4n){
  margin-right: 0;
}
.th-backwhite{
  width: 750rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom:4rpx solid #f5f5f5;
}
.th-submit-btn{
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  margin: 50rpx auto;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}
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
