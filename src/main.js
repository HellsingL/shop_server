// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入elementUI
import ElementUI from 'element-ui'
import axios from 'axios'
// 导入 全局自定义样式表
import './assets/css/global.css'

Vue.use(ElementUI)

// 配置axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

axios.interceptors.request.use(config => {
  // 通过拦截request请求,主动为 请求头,追加新属性 Authorization,等于 token 值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
