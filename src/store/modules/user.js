const state = {
  _status: false,
  isLogin: false,
  _userInfo: {}, // 存储微信用户获取到的信息
  userData: {}, // 存储后端返回的用户信息
  userInfos: {}
}

const getters = {
  status: state => state._status,
  userInfo: state => state._userInfo, // 微信授权的用户信息
  isLogin: state => state.isLogin, // 用户登陆信息
  userData: state => state.userData, // 用户id信息
  userInfos: state => state.userInfos // 数据库查询到的用户信息
}

const mutations = {
  changeStatus (state, param) {
    // state._status = state._status ? false : true;
    state._userInfo = param
  },
  changeLoginStatus (state, status) {
    state.isLogin = status
  },
  // params为用户后端的数据，主要是用来返回user_id
  changeUserData (state, params) {
    state.userData = params
  },
  changeUserInfo (state, params) {
    state.userInfos = params
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
