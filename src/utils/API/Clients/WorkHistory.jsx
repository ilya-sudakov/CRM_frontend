import { request } from '../../utilsAPI.jsx';

export function getClientWorkHistory() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/history/',
    method: 'GET',
  });
}

export function addClientWorkHistory(newWorkHistory) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/history',
    method: 'POST',
    body: JSON.stringify(newWorkHistory),
  });
}

export function editClientWorkHistory(newWorkHistory, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/history/' + id,
    method: 'PUT',
    body: JSON.stringify(newWorkHistory),
  });
}

export function deleteClientWorkHistory(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/history/' + id,
    method: 'DELETE',
  });
}
