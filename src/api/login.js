import request from '@/api/request.js'

// 登录接口
export function login(data){
    return request({
        url:'/login',
        method:"post",
        data
    })
}
export function sendsms(data){
    return request({
        url:'/sendsms',
        method:'post',
        data
    })
}
export function register(data){
    return request({
        url:'/register',
        method:'post',
        data
    })
}