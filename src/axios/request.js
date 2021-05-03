import axios from 'axios' //используем локальный axios во всем приложении
import router from "@/router";

const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})

// Add a response interceptor
requestAxios.interceptors.response.use(null, error => { //в случае успеха ничего не делаем, поэтому null
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }

    return Promise.reject(error)
})

export default requestAxios
