import login from '@/views/login/login'
import index from '@/views/index/index'
import subject from '@/views/index/subject/subject'
import enterprise from '@/views/index/enterprise/enterprise'
export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        component: index,
        redirect:'/index/subject',  //路由重定向
        children:[
            
            {
                path:'subject',
                component:subject
            },
            {
                path:'enterprise',
                component:enterprise
            }
        ]
    }
    
]