import { request } from '../../utilsAPI.jsx'

export function getClientCategories() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category/client/',
    method: 'GET',
  })
}

export function getSupplierCategories() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category/supplier/',
    method: 'GET',
  })
}

export function getClientCategoryById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category/' + id,
    method: 'GET',
  })
}

// export function getClientsByCategory(categoryName) {
//     return request({
//         url: process.env.API_BASE_URL + "/api/v1/category/" + categoryName,
//         method: "GET"
//     });
// }

export function addClientCategory(newCategory) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category',
    method: 'POST',
    body: JSON.stringify(newCategory),
  })
}

export function editClientCategory(newCategory, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category/' + id,
    method: 'PUT',
    body: JSON.stringify(newCategory),
  })
}

export function deleteClientCategory(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/category/' + id,
    method: 'DELETE',
  })
}
