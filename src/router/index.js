import Vue from 'vue'
// import router from 'vue-router'
import VueRouter from 'vue-router'

import login from '@/views/login/login'
import index from '@/views/index/index'
import { Message } from 'element-ui'

import { userInfo } from '@/api/user.js'
import { getToken,removeToken } from '@/utils/token.js'
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
// 地址白名单
const whitePaths = ['/login']
// 增加导航守卫
router.beforeEach((to,from,next)=>{
    if(!whitePaths.includes(to.path)){
    // if(to.push === '/index'){
        // 首页才需要判断token
        if(!getToken()){
            Message.error('必须登录才可以访问首页');
            return next("/login")
        }
        // token正确性判断
        userInfo().then(res=>{
            window.console.log(res)
            if(res.data.code===0){
                // token验证失效
                Message.error("登录状态有误，请重新登录")
                // 删除错误的token
                removeToken()
                // 跳转去登录页
                next('/login')
            }else{
                // token验证成功
                next()
            }
        })
      } else {
        // 放过去
        next();
      }
        })
    

export default router;