import request from '../utils/request'


export function itemAdd(data) {
    return request({
        url: '/item',
        method: 'post',
        data
    })
}

export function itemDelete(_id) {
    return request({
        url: '/item',
        method: 'delete',
        params: {
            _id
        }
    })
}

export function itemUpdate(data) {
    return request({
        url: '/item',
        method: 'put',
        data
    })
}

export function itemList(params) {
    return request({
        url: '/item',
        method: 'get',
        params
    })
}

export function itemDetail(params) {
    return request({
        url: '/item/detail',
        method: 'get',
        params
    })
}

export function itemStar(data) {
    return request({
        url: '/item/star',
        method: 'put',
        data
    })
}

export function itemSpider() {
    return request({
        url: '/item/spider',
        method: 'get'
    })
}