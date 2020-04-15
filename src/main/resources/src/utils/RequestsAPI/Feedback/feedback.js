import { request } from '../../utilsAPI.jsx';

export function getFeedback(signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/feedback/",
        method: "GET"
    });
}

export function getFeedbackById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/feedback/" + id,
        method: "GET"
    });
}

export function deleteFeedbackById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/feedback/" + id,
        method: "DELETE"
    });
}

export function addFeedback(newFeedback) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/feedback/",
        method: "POST",
        body: JSON.stringify(newFeedback)
    });
}

export function editFeedback(newFeedback, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/feedback/" + id,
        method: "PUT",
        body: JSON.stringify(newFeedback)
    });
}
