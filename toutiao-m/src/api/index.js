import request from '@/utils/request'

export const getAllchannels = ()=>request({url:'/v1_0/channels'})

export const reqLogin = (data)=>request({url:'/v1_0/authorizations',method:'post',data})

export const reqChannels = ()=>{
    let token = localStorage.getItem('geek-itheima')
    if(token){
        return request({url:'/v1_0/user/channels',method:'get'})
    }else{
        return request({url:'/v1_0/channels',method:'get'})
    }
}

export const reqArticleList = (id,time)=>request({url:`/v1_0/articles?channel_id=${id}&timestamp=${time}`})

export const reqDislike =(id)=>request({url:'/v1_0/article/dislikes',method:"post",data:{target:id}})

export const reqReport = (id,type)=>request({url:'/v1_0/article/reports',method:'post',data:{target:id,type:type,remark:'我是额外的内容'}})

export const reqReset = (shuju)=>request({url:`/v1_0/user/channels`,method:'put',data:{channels:shuju}})