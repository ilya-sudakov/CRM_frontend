import { request } from '../utilsAPI.jsx';

export function getParts() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/detail/',
    method: 'GET',
  });
}

export function getPartById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/detail/' + id,
    method: 'GET',
  });
}

export function deletePart(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/detail/' + id,
    method: 'DELETE',
  });
}

export function addPart(newPart) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/detail/',
    method: 'POST',
    body: JSON.stringify(newPart),
  });
}

export function editPart(newPart, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/detail/' + id,
    method: 'PUT',
    body: JSON.stringify(newPart),
  });
}
