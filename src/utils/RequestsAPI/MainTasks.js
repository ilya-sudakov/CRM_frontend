import { request } from '../utilsAPI.jsx'

export function getMainTasks(signal) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/',
    method: 'GET',
    signal: signal,
  })
}

export function getMainTaskById(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/' + id,
    method: 'GET',
  })
}

export function deleteMainTask(id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/' + id,
    method: 'DELETE',
  })
}

export function addMainTask(newTask) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/',
    method: 'POST',
    body: JSON.stringify(newTask),
  })
}

export function editMainTask(newTask, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/' + id,
    method: 'PUT',
    body: JSON.stringify(newTask),
  })
}

export function editTaskStatus(newStatus, id) {
  return request({
    url: process.env.API_BASE_URL + '/api/v1/mainTask/condition/' + id,
    method: 'PUT',
    body: JSON.stringify(newStatus),
  })
}
