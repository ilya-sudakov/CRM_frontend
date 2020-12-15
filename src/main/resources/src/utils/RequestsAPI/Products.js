import { request } from '../utilsAPI.jsx'

//GET-запрос всех записей из таблицы продукции
export function getProducts() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/',
    method: 'GET',
  })
}

//GET-запрос для получения записи продукции по ее id
export function getProductById(id, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/' + id,
    method: 'GET',
    signal: signal,
  })
}

//POST-запрос для получения записей продукции по названию категории продукции
export function getProductsByCategory(category, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/category/',
    method: 'POST',
    body: JSON.stringify(category),
    signal: signal,
  })
}

//POST-запрос для получения записей продукции 
//по названию подразделения предприятия, на котором она производится 
export function getProductsByLocation(workshop, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/location/',
    method: 'POST',
    body: JSON.stringify(workshop),
    signal: signal,
  })
}

//DELETE-запрос для удаления продукции по ее id
export function deleteProduct(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/' + id,
    method: 'DELETE',
  })
}

//POST-запрос для добавление записи продукции в таблицу
export function addProduct(newProduct) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/',
    method: 'POST',
    body: JSON.stringify(newProduct),
  })
}

//PUT-запрос для изменение записи продукции в таблице
export function editProduct(newProduct, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/' + id,
    method: 'PUT',
    body: JSON.stringify(newProduct),
  })
}
