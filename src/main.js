// Vue 构建版本加载设置
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入 ElementUI 样式和组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入 axios 并挂载到 Vue 实例
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 使用 ElementUI 组件库
Vue.use(ElementUI);

// 设置接口请求的基础地址
axios.defaults.baseURL = '/api'

// 全局设置 token，在每次请求时将 token 添加到请求头
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
})

/* 创建 Vue 实例 */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
