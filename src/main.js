import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
Vue.config.productionTip = false
//导入element-ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
