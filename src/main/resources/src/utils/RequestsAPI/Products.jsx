import { request } from '../utilsAPI.jsx';

export function getProducts() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/",
        method: "GET"
    })
}

export function getProductById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "GET"
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