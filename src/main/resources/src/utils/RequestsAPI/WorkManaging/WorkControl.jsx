import { request } from '../../utilsAPI.jsx';

export function getRecordedWorks() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/",
        method: "GET"
    })
}

export function getRecordedWorkById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
        method: "GET"
    })
}

export function getRecordedWorkByMonth(month) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/month/" + month,
        method: "GET"
    })
}

export function addProductToRecordedWork(id, productId, productQuantity) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/product/" + id + '&' + productId + '&' + productQuantity,
        method: "GET"
    })
}

export function deleteRecordedWork(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
        method: "DELETE"
    })
}

export function addRecordedWork(newWork) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/",
        method: "POST",
        body: JSON.stringify(newWork)
    })
}

export function editRecordedWork(newWork, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
        method: "PUT",
        body: JSON.stringify(newWork)
    })
}