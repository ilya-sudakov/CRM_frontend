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

export function getRecordedWorkByDay(month, day) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/day/" + day + '&' + month,
        method: "GET"
    })
}

export function getRecordedWorkByDateRange(dF, mF, dL, mL, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/range/" + dF + '&' + mF + '&' + dL + '&' + mL,
        method: "GET",
        signal: signal
    })
}

export function getWorkReportByEmployee(id, month) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/report/" + id + '&' + month,
        method: "GET"
    })
}

export function addProductToRecordedWork(id, productId, productQuantity, productName) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/product/" + id + '&' + productId + '&' + productQuantity,
        method: "POST",
        body: JSON.stringify(productName)
    })
}

export function deleteProductFromRecordedWork(id, productId) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/work_control/product/" + id + '&' + productId,
        method: "DELETE"
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