import { request, requestCrossOrigin } from '../../utilsAPI.jsx';

export function getPriceList() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/',
    method: 'GET',
  });
}

export function deletePriceGroupById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/' + id,
    method: 'DELETE',
  });
}

export function getPriceGroupById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/' + id,
    method: 'GET',
  });
}

export function getPriceGroupImageByName(name) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/name/' + name,
    method: 'GET',
  });
}

export function updatePriceGroupByName(name, body) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/name/' + name,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function addPriceGroup(newRequest) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_group/',
    method: 'POST',
    body: JSON.stringify(newRequest),
  });
}

export function addProductToPriceGroup(newRequest) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_product/',
    method: 'POST',
    body: JSON.stringify(newRequest),
  });
}

export function getPriceListCoefficient() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_product/price',
    method: 'GET',
  });
}

export function editPriceListCoefficient(newRequest) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_product/price',
    method: 'POST',
    body: JSON.stringify(newRequest),
  });
}

export function deleteProductFromPriceGroupById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/price_product/' + id,
    method: 'DELETE',
  });
}
