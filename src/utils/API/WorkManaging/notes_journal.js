import { getAuthHeaders } from '../../utilsAPI.jsx';
import axios from 'axios';

export function getNotesJournalList(date = new Date()) {
  const headers = getAuthHeaders();
  return axios.post(
    `${process.env.API_URL}/api/v1/journal/date/`,
    {
      date: Math.floor(date.getTime() / 1000),
    },
    headers,
  );
}

export function addJournalNote(item) {
  const headers = getAuthHeaders();
  return axios.post(`${process.env.API_URL}/api/v1/journal/`, item, headers);
}

export function editJournalNote(item, id) {
  const headers = getAuthHeaders();
  return axios.put(
    `${process.env.API_URL}/api/v1/journal/${id}`,
    item,
    headers,
  );
}

export function deleteJournalNote(id) {
  const headers = getAuthHeaders();
  return axios.delete(`${process.env.API_URL}/api/v1/journal/${id}`, headers);
}
