import { request } from '../../utilsAPI.jsx';

export function getClientLegalEntities() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/legal/',
    method: 'GET',
  });
}

export function addClientLegalEntity(newLegalEntity) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/legal',
    method: 'POST',
    body: JSON.stringify(newLegalEntity),
  });
}

export function editClientLegalEntity(newLegalEntity, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/legal/' + id,
    method: 'PUT',
    body: JSON.stringify(newLegalEntity),
  });
}

export function deleteClientLegalEntity(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/legal/' + id,
    method: 'DELETE',
  });
}
