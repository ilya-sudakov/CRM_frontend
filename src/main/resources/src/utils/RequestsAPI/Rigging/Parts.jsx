import { request } from '../../utilsAPI.jsx';

export function getPart() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/",
        method: "GET"
    })
}

export function getPartById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/" + id,
        method: "GET"
    })
}

export function deletePart(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/" + id,
        method: "DELETE"
    })
}

export function addPart(newStamp) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/",
        method: "POST",
        body: JSON.stringify(newStamp)
    })
}

export function editPart(newStamp, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/" + id,
        method: "PUT",
        body: JSON.stringify(newStamp)
    })
}

export function addPartsToPart(newPart) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/",
        method: "POST",
        body: JSON.stringify(newPart)
    })
}

export function editPartsOfPart(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function getPartFromPart(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/" + id,
        method: "GET"
    })
}

export function editPartFromPart(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function deletePartsFromPart(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/" + id,
        method: "DELETE"
    })
}

export function editPartColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}

export function editPartPartColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/part/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}