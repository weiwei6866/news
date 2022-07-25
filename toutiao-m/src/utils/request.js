import axios from "axios";


const request = axios.create({
    baseURL:'http://geek.itheima.net/',
    timeout:5000
})

request.interceptors.request.use((config)=>{
    let token = localStorage.getItem('geek-itheima')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

request.interceptors.response.use(
(res)=>{
return res.data
},
(error)=>{
    console.log(error);
return Promise.reject('fail')
})




export default request