/* eslint-disable */
import Vue from 'vue'
import App from './App'
import fly from './utils/api/index'
import weui from '../static/weui/weui.css'
import store from './store/index.js'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
// 实例化fly
Vue.prototype.$fly = fly
Vue.prototype.$store=store