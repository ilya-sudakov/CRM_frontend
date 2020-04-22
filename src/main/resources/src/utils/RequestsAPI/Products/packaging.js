import { request } from '../../utilsAPI.jsx';

export function getPackaging(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/packaging/",
        method: "GET",
        signal: signal
    })
}

export function getPackagingById(id, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/packaging/" + id,
        method: "GET",
        signal: signal
    })
}

export function addPackaging(packaging, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/packaging/",
        method: "PUT",
        body: JSON.stringify(packaging),
        signal: signal
    })
}

export function editPackaging(id, packaging, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/packaging/" + id,
        method: "PUT",
        body: JSON.stringify(packaging),
        signal: signal
    })
}

export function deletePackaging(id, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/packaging/" + id,
        method: "DELETE",
        signal: signal
    })
}