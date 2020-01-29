import request from './request.js'
import { getToken } from '@/utils/token.js'
export function userInfo(){
    return request({
        url:"/info",
        method:"get",
        headers:{
            token:getToken()
        }
    })
}