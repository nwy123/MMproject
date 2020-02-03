//学科模块接口
import request from '@/api/request.js'

//学科列表
export function subjectList(params){
    return request({
        url:'/subject/list',
        method:'get',
        params
    })
}
//添加学科
export function subjectAdd(data){
    return request({
        url:'/subject/add',
        method:'post',
        data
    })
}

//学科状态

export function subjuecStatus(data){
    return request({
        url:'/subject/status',
        method:'post',
        data
    })
}

// 学科编辑
export function subjectEdit(data){
    return request({
        url:'/subject/edit',
        method:'post',
        data
    })
}

//删除学科
export function subjectRemove(data){
    return request({
        url:'/subject/remove',
        method:'post',
        data
    })
}