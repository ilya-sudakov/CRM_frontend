import { getAuthHeaders } from '../../utilsAPI.jsx';
import axios from 'axios';

export function getStorage(workshop) {
  const headers = getAuthHeaders();
  return axios.get(
    `${process.env.API_BASE_URL}/api/v1/${workshop}_storage/`,
    headers,
  );
}

export function getStorageById(workshop, id) {
  const headers = getAuthHeaders();
  return axios.get(
    `${process.env.API_BASE_URL}/api/v1/${workshop}_storage/${id}`,
    headers,
  );
}

export function deleteStorage(workshop, id) {
  const headers = getAuthHeaders();
  return axios.delete(
    `${process.env.API_BASE_URL}/api/v1/${workshop}_storage/${id}`,
    headers,
  );
}

export function createStorage(workshop, data) {
  const headers = getAuthHeaders();
  return axios.post(
    `${process.env.API_BASE_URL}/api/v1/${workshop}_storage/`,
    data,
    headers,
  );
}

export function updateStorage(workshop, data, id) {
  const headers = getAuthHeaders();
  return axios.put(
    `${process.env.API_BASE_URL}/api/v1/${workshop}_storage/${id}`,
    data,
    headers,
  );
}
