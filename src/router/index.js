import Vue from 'vue'
// import router from 'vue-router'
import VueRouter from 'vue-router'

import login from '../views/login/login'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/login',
            component:login
        }
    ]
})
export default router;