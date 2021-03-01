import { request } from '../utilsAPI.jsx';

export function getDocuments() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/document/",
        method: "GET"
    })
}

export function deleteDocument(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/document/" + id,
        method: "DELETE"
    })
}