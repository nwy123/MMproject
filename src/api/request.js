import axios from 'axios'

// 导入仓库
import store from '@/store/store.js'

// token
import { getToken,removeToken } from '@/utils/token.js'
// 导入路由
import router from "@/router/index.js";
// 导入Element-ui的弹框
// import { Message } from "element-ui";
const request = axios.create({
    
    baseURL:process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials:true
})

// 拦截器
// 请求拦截器
axios.interceptors.request.use(
    config => {
        if(store.state.userInfo){
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
axios.interceptors.response.use(response => {
    if (response.data.code === 206) {
        
        // 移除token
        removeToken();
        // 去登录页
        router.push("/login");
      }
    return response.data
},error => {
    return Promise.reject(error)
}
)

export default request