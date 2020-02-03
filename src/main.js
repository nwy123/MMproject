import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
Vue.config.productionTip = false
//导入element-ui
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
// 
import store from '@/store/store.js'
// 导入全局样式
import '@/styles/base.less'

import axios from 'axios'

//导入全局过滤器
import '@/filter/filter.js'
Vue.prototype.$http = axios;
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
