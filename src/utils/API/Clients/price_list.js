import { getAuthHeaders } from '../../utilsAPI.jsx';
import axios from 'axios';

export function getPriceLists() {
  const headers = getAuthHeaders();
  return axios.get(`${process.env.API_URL}/api/v1/priceList/`, headers);
}

export function createPricelist(priceList) {
  const headers = getAuthHeaders('multipart/form-data');
  return axios.post(
    `${process.env.API_URL}/api/v1/fileWithoutDB/uploadMultipleFiles/priceList/`,
    priceList,
    headers,
  );
}

export function deletePriceList(id) {
  const headers = getAuthHeaders('multipart/form-data');
  return axios.delete(`${process.env.API_URL}/api/v1/priceList/${id}`, headers);
}
