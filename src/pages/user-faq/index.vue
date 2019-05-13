<template>
  <div class="container">
    <div class="user-faq">
      <van-dialog use-slot :show="showUserFaq" async-close @close="onCloseUserFaq" @confirm="confirmChangeUserFaq">
        <van-panel custom-class='user-help-root' header-class="user-help" title="使用帮助">
          <view>{{userHelp}}</view>
        </van-panel>
      </van-dialog>
      <van-dialog use-slot :show="showFeedback" async-close show-cancel-button @close="onCloseFeedback" @confirm="confirmChangeFeedback">
        <van-cell-group>
          <van-panel custom-class='user-help-root' header-class="user-help" title="提交用户反馈">
            <van-field
              type="textarea"
              placeholder="请输入留言"
              autosize
              @change="changeUserFeedbackEvent"
            />
          </van-panel>
        </van-cell-group>
      </van-dialog>
      <van-cell-group>
        <van-cell title="用户使用帮助" size="large" @click="changeUserFaqDialogStatus"/>
        <van-cell title="提交用户反馈" size="large" @click="changeUserFeedback"/>
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
      user_id: '',
      showUserFaq: false,
      showFeedback: false,
      userHelp: '1.用户需要使用微信账号进行登陆，才能使用相应功能。',
      userFeedback: ''
    }
  },
  onShow () {
    this.userFeedback = ''
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'userData', 'userInfos'])
  },
  methods: {
    ...mapMutations(['changeStatus', 'changeLoginStatus', 'changeUserData', 'changeUserInfo']),
    changeUserFeedbackEvent (e) {
      this.userFeedback = e.mp.detail
    },
    changeUserFaqDialogStatus () {
      this.showUserFaq = true
    },
    confirmChangeUserFaq () {
    },
    onCloseUserFaq () {
      this.showUserFaq = false
    },
    changeUserFeedback () {
      this.showFeedback = true
    },
    confirmChangeFeedback () {
      this.user_id = store.state.user.userData
      if (this.userFeedback != '') { //eslint-disable-line
        this.$fly.post('/user/feedback', {
          user_id: this.user_id,
          content: this.userFeedback
        }).then(res => {
          if (res.status == 200) { //eslint-disable-line
            wx.showToast({
              title: '反馈成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    onCloseFeedback () {
      this.showFeedback = false
    }
  }
}
</script>

<style scoped>
.user-help {
  font-size: 16px;
  font-weight: 600;
}
.user-faq {
  width: 90%;
  margin-top: 5px;
}
</style>
