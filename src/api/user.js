import request from '../utils/request'

export function userLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data,
    })
}

export function userRegister(data) {
    return request({
        url: '/register',
        method: 'post',
        data: data,
    })
}


export function userList(params) {
    return request({
        url: '/user',
        method: 'get',
        params
    })
}

export function userDelete(ids) {
    return request({
        url: '/user',
        method: 'delete',
        params: {
            _id: ids
        }
    })
}

export function userUpdate(data) {
    return request({
        url: '/user',
        method: 'put',
        data
    })
}