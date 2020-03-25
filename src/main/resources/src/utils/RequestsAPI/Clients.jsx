import { request, requestINN } from '../utilsAPI.jsx';

export function getClients() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/",
        method: "GET"
    });
}

export function getClientsByCategory(category) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/category/",
        method: "POST",
        body: JSON.stringify(category)
    })
}

export function editNextContactDateClient(date) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/date/",
        method: "POST",
        body: JSON.stringify(date)
    })
}

export function getClientsByCategoryAndType(category_type, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/category_type/",
        method: "POST",
        body: JSON.stringify(category_type),
        signal: signal
    })
}

export function getClientById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/" + id,
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

export function editClient(newClient, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/" + id,
        method: "PUT",
        body: JSON.stringify(newClient)
    })
}

export function deleteClient(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/" + id,
        method: "DELETE"
    })
}

export function getInfoByINN(INN) {
    return requestINN({
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
        method: "POST",
        body: JSON.stringify(INN)
    })
}

export function getBIKByINN(INN) {
    return requestINN({
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank',
        method: "POST",
        body: JSON.stringify(INN)
    })
}