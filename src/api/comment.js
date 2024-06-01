import request from '../utils/request'

export function commentAdd(data) {
    return request({
        url: '/comment',
        method: 'post',
        data
    })
}

export function commentDelete(ids) {
    return request({
        url: '/comment',
        method: 'delete',
        params: {
            id: ids
        }
    })
}

export function commentList(params) {
    return request({
        url: '/comment',
        method: 'get',
        params
    })
}