import axios from 'axios';
import { getAuthHeaders, request } from '../utilsAPI.jsx';

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

export const addEmployee = (data) => {
  const headers = getAuthHeaders('multipart/form-data');
  return axios.post(
    `${process.env.API_BASE_URL}/api/v1/employee/`,
    data,
    headers,
  );
};

export const editEmployee = (data, id) => {
  const headers = getAuthHeaders('multipart/form-data');
  return axios.post(
    `${process.env.API_BASE_URL}/api/v1/employee/${id}`,
    data,
    headers,
  );
};
