import Vue from 'vue'
// import router from 'vue-router'
import VueRouter from 'vue-router'

import login from '@/views/login/login'
import index from '@/views/index/index'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index
        }
    ]
})
export default router;