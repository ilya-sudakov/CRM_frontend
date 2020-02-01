import { request } from '../../utilsAPI.jsx';

export function getRequestsLepsari() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/",
        method: "GET"
    })
}

export function deleteRequestLepsari(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/" + id,
        method: "DELETE"
    })
}

export function addRequestLepsari(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export async function asyncAddRequestLepsari(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function getRequestLepsariById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/" + id,
        method: "GET"
    })
}

export function editRequestLepsariStatus(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}

export function editRequestLepsari(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function addProductsToRequestLepsari(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari_product/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function editProductsToRequestLepsari(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari_product/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function deleteProductsToRequestLepsari(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari_product/" + id,
        method: "DELETE"
    })
}

export function editProductStatusToRequestLepsari(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari_product/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}