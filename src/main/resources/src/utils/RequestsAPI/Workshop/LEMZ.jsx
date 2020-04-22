import { request } from '../../utilsAPI.jsx';

export function getRequestsLEMZ(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/",
        method: "GET",
        signal: signal
    })
}

export function deleteRequestLEMZ(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "DELETE"
    })
}

export function addRequestLEMZ(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function getRequestLEMZById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "GET"
    })
}

export function editRequestLEMZStatus(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}

export function editRequestLEMZ(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function addProductsToRequestLEMZ(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz_product/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function editProductsToRequestLEMZ(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz_product/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function deleteProductsToRequestLEMZ(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz_product/" + id,
        method: "DELETE"
    })
}

export function editProductStatusToRequestLEMZ(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz_product/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}