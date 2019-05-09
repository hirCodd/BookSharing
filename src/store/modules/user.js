const state = {
  _status: false,
  isLogin: false,
  _userInfo: {}, // 存储微信用户获取到的信息
  userData: {}  // 存储后端返回的用户信息
}

const getters = {
  status: state => state._status,
  userInfo: state => state._userInfo,
  isLogin: state => state.isLogin,
  userData: state => state.userData
}

const mutations = {
  changeStatus (state, param) {
    // state._status = state._status ? false : true;
    console.log('param:', param)
    state._userInfo = param
    console.log(state._userInfo)
  },
  changeLoginStatus (state, status) {
    state.isLogin = status
  },
  // params为用户后端的数据，主要是用来返回user_id
  changeUserData (state, params) {
    state.userData = params
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
