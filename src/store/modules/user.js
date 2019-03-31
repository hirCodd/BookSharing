const state = {
  _status: false,
  isLogin: false,
  _userInfo: {}
}

const getters = {
  status: state => state._status,
  userInfo: state => state._userInfo,
  isLogin: state => state.isLogin
}

const mutations = {
  changeStatus (state, param) {
    // state._status = state._status ? false : true;
    console.log('param:', param)
    state._userInfo = param
  },
  changeLoginStatus (state, status) {
    state.isLogin = status
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
