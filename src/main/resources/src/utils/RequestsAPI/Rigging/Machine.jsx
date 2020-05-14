import { request } from '../../utilsAPI.jsx';

export function getMachine(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/",
        method: "GET",
        signal: signal
    })
}

export function getMachineById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/" + id,
        method: "GET"
    })
}

export function deleteMachine(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/" + id,
        method: "DELETE"
    })
}

export function addMachine(newStamp) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/",
        method: "POST",
        body: JSON.stringify(newStamp)
    })
}

export function editMachine(newStamp, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/" + id,
        method: "PUT",
        body: JSON.stringify(newStamp)
    })
}

export function addPartsToMachine(newPart) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/",
        method: "POST",
        body: JSON.stringify(newPart)
    })
}

export function editPartsOfMachine(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function getPartFromMachine(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/" + id,
        method: "GET"
    })
}

export function editPartFromMachine(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function deletePartsFromMachine(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/" + id,
        method: "DELETE"
    })
}

export function editMachineColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}

export function editMachinePartColor(color, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/bench/part/color/" + id,
        method: "PUT",
        body: JSON.stringify(color)
    })
}