import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'http://localhost:8888',
        timeout:500
    })

    instance.interceptors.request.use(config =>{
        console.log('拦截请求');
        return config;
    })

    return instance(config)
}