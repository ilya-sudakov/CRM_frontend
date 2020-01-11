import { request } from '../utilsAPI.jsx';

export function getClients() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/",
        method: "GET"
    });
}

export function addClient(newClient) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client",
        method: "POST",
        body: JSON.stringify(newClient)
    })
}

export function deleteClient(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/" + id,
        method: "DELETE"
    })
}