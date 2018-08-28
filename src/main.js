// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App'
import 'font-awesome/css/font-awesome.min.css';
Vue.config.productionTip = false
Vue.use(VueRouter)// 安装路由功能
// Vue.prototype.$http = axios
Vue.use(VueResource)
Vue.use(ElementUI)
/* eslint-disable no-new */
// let router = new VueRouter({
//   // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
//   'linkActiveClass': 'active',
//   routes
// });



new Vue({
  el: '#app',
  router,
  'linkActiveClass': 'active',
  template: '<App/>',
  components: { App }
})
