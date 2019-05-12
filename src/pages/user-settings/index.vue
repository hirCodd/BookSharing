<template>
  <div class="container">
    <div class="user-settings">
      <van-dialog use-slot :show="show" async-close show-cancel-button @close="onClose" @confirm="confirmChange">
        <van-field
          :value="value"
          label="用户签名"
          size="large"
          placeholder="请输入用户签名"
          border="false"
          @change="changeUserSign"
        />
      </van-dialog>
      <van-cell-group>
        <van-cell title="修改用户签名" size="large" @click="changeDialogStatus"/>
        <van-cell title="暂定" value="内容" size="large" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../../store/index.js'
export default {
  data () {
    return {
      value: '',
      user_id: '',
      show: false,
      sign: ''
    }
  },
  onShow () {
  },
  onLoad () {
    this.getUserInfo()
  },
  created () {},
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData', 'userInfos'])
  },
  methods: {
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData', 'changeUserInfo']),
    changeDialogStatus () {
      this.show = true
    },
    onClose () {
      this.show = false
    },
    changeUserSign (e) {
      this.sign = e.mp.detail
    },
    getUserInfo () {
      this.user_id = store.state.user.userData
      this.$fly.get('/user/getone', {
        user_id: this.user_id
      }).then(res => {
        this.value = res.user_data[0].user_sign
      })
    },
    confirmChange () {
      // 通过vuex拿到用户user_id
      this.user_id = store.state.user.userData
      // 用户信息不同才更新到数据库，如果相同则不用更新到数据库
      if (this.sign != '' && this.sign != this.value) { //eslint-disable-line
        this.$fly.post('/user/signs', {
          user_id: this.user_id,
          user_sign: this.sign
        })
        this.$fly.get('/user/getone', {
          user_id: this.user_id
        }).then(res => {
          // 更新了用户信心后重新再vuex中重新赋值
          this.changeUserInfo(res.user_data[0])
        })
      } else {
        wx.showToast({
          title: '用户签名相同'
        })
      }
    }
  }
}
</script>

<style scoped>
.user-settings {
  width: 90%;
  margin-top: 5px;
}
</style>
