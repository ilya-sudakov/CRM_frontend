import { request } from '../../utilsAPI.jsx'

export function getCategories() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/',
    method: 'GET',
  })
}

export function getCategoriesNames(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/name/',
    method: 'GET',
    signal: signal,
  })
}

export function getCategoryById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/' + id,
    method: 'GET',
  })
}

export function deleteCategory(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/' + id,
    method: 'DELETE',
  })
}

export function addCategory(newCategory) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/',
    method: 'POST',
    body: JSON.stringify(newCategory),
  })
}

export function editCategory(newCategory, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product_category/' + id,
    method: 'PUT',
    body: JSON.stringify(newCategory),
  })
}
