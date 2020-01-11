import { request } from '../utilsAPI.jsx';

export function getRequests() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/",
        method: "GET"
    })
}

export function deleteRequest(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "DELETE"
    })
}

export function addRequest(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function addProductsToRequest(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request_product/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function editProductsToRequest(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request_product/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function deleteProductsToRequest(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request_product/" + id,
        method: "DELETE"
    })
}

export function getRequestById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "GET"
    })
}

export function editRequestStatus(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}

export function editRequest(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}