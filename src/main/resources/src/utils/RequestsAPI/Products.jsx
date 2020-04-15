import { request } from '../utilsAPI.jsx';

export function getProducts() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/",
        method: "GET"
    })
}

export function getProductById(id, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "GET", 
        signal: signal
    })
}

export function getProductsByCategory(category, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/category/",
        method: "POST",
        body: JSON.stringify(category),
        signal: signal
    })
}

export function getProductsByLocation(workshop, signal) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/location/",
        method: "POST",
        body: JSON.stringify(workshop), 
        signal: signal
    })
}

export function deleteProduct(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "DELETE"
    })
}

export function addProduct(newProduct) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/",
        method: "POST",
        body: JSON.stringify(newProduct)
    })
}

export function editProduct(newProduct, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "PUT",
        body: JSON.stringify(newProduct)
    })
}