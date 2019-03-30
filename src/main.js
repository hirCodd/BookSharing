/* eslint-disable */
import Vue from 'vue'
import App from './App'
import fly from './utils/api/index'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$fly = fly;