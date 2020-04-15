import { request } from '../utilsAPI.jsx';

export function getTransportations(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/",
        method: "GET",
        signal: signal
    })
}

export function getTransportationById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/" + id,
        method: "GET"
    })
}

export function deleteTransportation(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/" + id,
        method: "DELETE"
    })
}

export function addTransportation(newTransportation) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/",
        method: "POST",
        body: JSON.stringify(newTransportation)
    })
}

export function editTransportation(newTransportation, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/" + id,
        method: "PUT",
        body: JSON.stringify(newTransportation)
    })
}