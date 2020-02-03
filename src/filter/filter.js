//过滤器
// 时间过滤器
import Vue from 'vue'
import moment from 'moment'

//注册全局过滤器
Vue.filter('formatTime',v=>{
    return moment(v).format('YYYY年MM月DD日')
})