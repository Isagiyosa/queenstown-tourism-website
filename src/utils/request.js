import axios from 'axios'

// axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

service.interceptors.request.use(
    function (config) {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        // console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    function (response) {
        const res = response.data
        if (res.code === 401) {
            alert("Not logged in")
            window.location.href = '/#login'
        } else {
            return response.data
        }
    },
    function (error) {
        console.log(error)
        return Promise.reject(error)
    }
)
export default service