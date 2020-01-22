import axios from 'axios'


const request = axios.create({
    withCredentials:true,
    // 基地址
    baseURL:process.env.VUE_APP_BASEURL
})
export default request