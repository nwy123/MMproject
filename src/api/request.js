import axios from 'axios'

// // 导入仓库
// import store from '@/store/store.js'
// token
import { getToken,removeToken } from '@/utils/token.js'
import { Message } from 'element-ui'
import router from '../router'
const request = axios.create({
    
    baseURL:process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials:true
})

// 拦截器
// 请求拦截器
request.interceptors.request.use(
    config => {
        if(getToken()){
            //如果有用户信息，就携带token
            config.headers.token = getToken()
        }
        return config
    },
    error =>{
        //请求错误
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(response => {
    if(response.data.code === 206){
        //提示用户
        Message.warning(response.data.message);
        //移除token
        removeToken()
        router.push('/login')
    }
    return response
},error => {
    return Promise.reject(error)
}
)

export default request