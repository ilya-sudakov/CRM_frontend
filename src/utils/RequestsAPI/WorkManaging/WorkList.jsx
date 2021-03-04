import { request } from '../../utilsAPI.jsx';

export function getWork(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/work-list/',
    method: 'GET',
    signal: signal,
  });
}

export function getWorkById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/work-list/' + id,
    method: 'GET',
  });
}

export function deleteWork(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/work-list/' + id,
    method: 'DELETE',
  });
}

export function addWork(newWork) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/work-list/',
    method: 'POST',
    body: JSON.stringify(newWork),
  });
}

export function editWork(newWork, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/work-list/' + id,
    method: 'PUT',
    body: JSON.stringify(newWork),
  });
}
