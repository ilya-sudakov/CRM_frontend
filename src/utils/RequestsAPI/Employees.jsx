import { request } from '../utilsAPI.jsx';

export function getEmployees() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/',
    method: 'GET',
  });
}

export function getEmployeeById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/' + id,
    method: 'GET',
  });
}

export function getEmployeesByComingBirthday() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/birth/',
    method: 'GET',
  });
}

export function getEmployeesByExpiredDocuments() {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/docs/',
    method: 'GET',
  });
}

export function getEmployeesByWorkshop(Workshop, signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/workshop',
    method: 'POST',
    body: JSON.stringify(Workshop),
    signal: signal,
  });
}

export function deleteEmployee(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/' + id,
    method: 'DELETE',
  });
}

export function addEmployee(newPart) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/',
    method: 'POST',
    body: JSON.stringify(newPart),
  });
}

export function editEmployee(newPart, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/employee/' + id,
    method: 'PUT',
    body: JSON.stringify(newPart),
  });
}
