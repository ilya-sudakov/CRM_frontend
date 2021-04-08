import { request } from '../../utilsAPI.jsx';

export function getClientContacts() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/contact/',
    method: 'GET',
  });
}

export function addClientContact(newContact) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/contact',
    method: 'POST',
    body: JSON.stringify(newContact),
  });
}

export function editClientContact(newContact, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/contact/' + id,
    method: 'PUT',
    body: JSON.stringify(newContact),
  });
}

export function deleteClientContact(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/contact/' + id,
    method: 'DELETE',
  });
}
