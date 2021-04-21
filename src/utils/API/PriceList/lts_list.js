import { getAuthHeaders } from '../../utilsAPI.jsx';
import axios from 'axios';

export function getLTDList() {
  const headers = getAuthHeaders();
  return axios.get(`${process.env.API_URL}/api/v1/plc/`, headers);
}

export function getLTDById(id) {
  const headers = getAuthHeaders();
  return axios.get(`${process.env.API_URL}/api/v1/plc/${id}`, headers);
}

export function addLTD(newLtd) {
  const headers = getAuthHeaders();
  return axios.post(`${process.env.API_URL}/api/v1/plc/`, newLtd, headers);
}

export function updateLTD(newLtd, id) {
  const headers = getAuthHeaders();
  return axios.post(`${process.env.API_URL}/api/v1/plc/${id}`, newLtd, headers);
}

export function deleteLTD(id) {
  const headers = getAuthHeaders();
  return axios.delete(`${process.env.API_URL}/api/v1/plc/${id}`, headers);
}
