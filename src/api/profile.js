import request from '../utils/request'


export function profileAdd(data) {
    return request({
        url: '/profile',
        method: 'post',
        data
    })
}


export function profileDelete(ids) {
    return request({
        url: '/profile',
        method: 'delete',
        params: {
            id: ids
        }
    })
}


export function profileUpdate(data) {
    return request({
        url: '/profile',
        method: 'put',
        data
    })
}


export function profileList(params) {
    return request({
        url: '/profile',
        method: 'get',
        params
    })
}