import request from '@/api/request.js'

//企业模块
//企业列表
export function enterpriseList(params){
    return request({
        url:'/enterprise/list',
        method:'get',
        params
    })
}
//添加企业
export function enterpriseAdd(data){
    return request({
        url:'/enterprise/add',
        method:'post',
        data
    })
}

// 企业状态
export function enterpriseStatus(data){
    return request({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

// 暴露接口 企业编辑
export function enterpriseEdit(data) {
    return request({
      url: "/enterprise/edit",
      method: "post",
      data
    });
  }
  
  // 暴露接口 企业删除
  export function enterpriseRemove(data) {
    return request({
      url: "/enterprise/remove",
      method: "post",
      data
    });
  }