import { request } from '../../utilsAPI.jsx'

export function getPackaging(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/packing/',
    method: 'GET',
    signal: signal,
  })
}

export function getPackagingById(id, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/packing/' + id,
    method: 'GET',
    signal: signal,
  })
}

export function addPackaging(packaging, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/packing/',
    method: 'POST',
    body: JSON.stringify(packaging),
    signal: signal,
  })
}

export function editPackaging(id, packaging, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/packing/' + id,
    method: 'PUT',
    body: JSON.stringify(packaging),
    signal: signal,
  })
}

export function deletePackaging(id, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/packing/' + id,
    method: 'DELETE',
    signal: signal,
  })
}

export function addPackagingToProduct(newPackaging, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/add/' + id,
    method: 'POST',
    body: JSON.stringify(newPackaging),
  })
}

export function deletePackagingFromProduct(productId) {
  const newPackaging = {
    packings: [],
  }
  return request({
    url: process.env.API_BASE_URL + '/api/v1/product/add/' + productId,
    method: 'POST',
    body: JSON.stringify(newPackaging),
  })
}
