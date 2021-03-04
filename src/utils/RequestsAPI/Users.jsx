import { request } from '../utilsAPI.jsx';

export function getUsers(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/admin/user/',
    method: 'GET',
    signal: signal,
  });
}

export function getUserById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/admin/user/' + id,
    method: 'GET',
  });
}

export function deleteUser(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/admin/user/' + id,
    method: 'DELETE',
  });
}

export function editUser(newUser, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/admin/user/' + id,
    method: 'PUT',
    body: JSON.stringify(newUser),
  });
}

export function addUser(newUser) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/admin/user/',
    method: 'POST',
    body: JSON.stringify(newUser),
  });
}
