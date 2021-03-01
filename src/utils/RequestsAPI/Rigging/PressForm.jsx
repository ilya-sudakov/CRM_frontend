import { request } from '../../utilsAPI.jsx';

export function getPressForm(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/",
        method: "GET",
        signal: signal
    })
}

export function getPressFormById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/" + id,
        method: "GET"
    })
}

export function deletePressForm(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/" + id,
        method: "DELETE"
    })
}

export function addPressForm(newStamp) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/",
        method: "POST",
        body: JSON.stringify(newStamp)
    })
}

export function editPressForm(newStamp, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/" + id,
        method: "PUT",
        body: JSON.stringify(newStamp)
    })
}

export function addPartsToPressForm(newPart) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/",
        method: "POST",
        body: JSON.stringify(newPart)
    })
}

export function editPartsOfPressForm(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function getPartFromPressForm(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/" + id,
        method: "GET"
    })
}

export function editPartFromPressForm(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function deletePartsFromPressForm(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/" + id,
        method: "DELETE"
    })
}

export function editPressFormColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}

export function editPressFormPartColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/press/part/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}