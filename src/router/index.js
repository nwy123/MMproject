import Vue from 'vue'
// import router from 'vue-router'
import VueRouter from 'vue-router'

import login from '@/views/login/login'
import index from '@/views/index/index'
import { Message } from 'element-ui'

import { userInfo } from '@/api/user.js'
import { getToken, removeToken } from '@/utils/token.js'
import store from '../store/store'


Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
// 地址白名单
const whitePaths = ['/login']
// 增加导航守卫
router.beforeEach((to, from, next) => {
    // 当要跳转到指定路由对象时才进入导航守卫判断条件
    if (!whitePaths.includes(to.path)) {
        // if(to.push === '/index'){
        // 首页才需要判断token
        // 未登录，跳转到登录页
        if (!getToken()) {
            Message.error('必须登录才可以访问首页');
            return next("/login")
        }
        // token正确性判断
        // 已经登录了，进行ID判断,如果不存在用户信息则进行用户信息请求
        if (!store.state.userInfo) {
            userInfo().then(res => {
                window.console.log(res)
                if (res.data.code === 206) {
                    // token验证失效
                    Message.error("登录状态有误，请重新登录")
                    // 删除错误的token
                    removeToken()
                    // 跳转去登录页
                    next('/login')
                } else {
                    // token验证成功

                    // 用户的头像地址缺少了一个基地址
                    res.data.data.avatar =
                        process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
                    store.commit('setInfo', res.data.data)
                    next()
                }
            })
        } else {
            next()
        }

    } else {
        // 放过去
        next();
    }
})


export default router;