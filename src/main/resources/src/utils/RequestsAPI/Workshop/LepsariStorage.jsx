import { request } from '../../utilsAPI.jsx';

export function getStorage() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari-storage/",
        method: "GET"
    })
}

export function getStorageById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari-storage/" + id,
        method: "GET"
    })
}

export function deleteStorage(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari-storage/" + id,
        method: "DELETE"
    })
}

export function addStorage(newStorage) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari-storage/",
        method: "POST",
        body: JSON.stringify(newStorage)
    })
}

export function editStorage(newStorage, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lepsari-storage/" + id,
        method: "PUT",
        body: JSON.stringify(newStorage)
    })
}