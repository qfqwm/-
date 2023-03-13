//对axios进行二次封装
import axios from 'axios'
const $axios = axios.create({
    baseURL:"http://47.115.216.81:8888",
    timeout:2000,
    // headers:{"Content-Type":"application/json;charset=utf-8"}
})

// $axios.interceptors.request.use((config) => {
//     config.headers = config.headers||{}
//     return config
// })
export default $axios
