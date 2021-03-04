import { request } from '../../utilsAPI.jsx';

export function getStamp(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/',
    method: 'GET',
    signal: signal,
  });
}

export function getStampsByStatus(status, signal) {
  return request({
    url: `${process.env.API_BASE_URL}/api/v1/stamp/status/${status}`,
    method: 'GET',
    signal: signal,
  });
}

export function getStampById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/' + id,
    method: 'GET',
  });
}

export function deleteStamp(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/' + id,
    method: 'DELETE',
  });
}

export function addStamp(newStamp) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/',
    method: 'POST',
    body: JSON.stringify(newStamp),
  });
}

export function editStamp(newStamp, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/' + id,
    method: 'PUT',
    body: JSON.stringify(newStamp),
  });
}

export function addPartsToStamp(newPart) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/',
    method: 'POST',
    body: JSON.stringify(newPart),
  });
}

export function editPartsOfStamp(newPart, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/' + id,
    method: 'PUT',
    body: JSON.stringify(newPart),
  });
}

export function getPartFromStamp(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/' + id,
    method: 'GET',
  });
}

export function editPartFromStamp(newPart, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/' + id,
    method: 'PUT',
    body: JSON.stringify(newPart),
  });
}

export function deletePartsFromStamp(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/' + id,
    method: 'DELETE',
  });
}

export function editStampColor(color, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/color/' + id,
    method: 'PUT',
    body: JSON.stringify(color),
  });
}

export function editStampPartColor(color, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/stamp/part/color/' + id,
    method: 'PUT',
    body: JSON.stringify(color),
  });
}
