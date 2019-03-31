<template>
  <div class="container">
    <div class="publish-user-info">
      <van-cell-group>
        <van-field
          label="联系人姓名"
          placeholder="请输入联系人姓名"
        />
        <van-field
          label="电话号码"
          placeholder="请输入电话号码"
        />
        <van-field
          label="联系人地址"
          placeholder="请输入联系人地址"
        />
      </van-cell-group>
    </div>
    <div class="publish-book-info">
      <van-cell-group>
        <van-field
          label="书籍名称"
          placeholder="请输入书籍名称"
        />
        <van-field
          label="书籍本数"
          placeholder="请输入书籍本数"
        />
        <van-field
          label="书本价格"
          placeholder="请输入书本价格"
        />
        <van-field
          autosize
          label="书籍描述"
          type="textarea"
          placeholder="请输入书籍描述"
        />
      </van-cell-group>
      <div class="submit-button"> 
        <van-button round type="default">圆形按钮</van-button>
      </div>
    </div>
  </div>
</template>

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