import { request } from '../../utilsAPI.jsx';

export function getMessages() {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/message/',
    method: 'GET',
  });
}

export function getMessagesByDiscussionId(id) {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/discussion/' + id,
    method: 'GET',
  });
}

export function getMessageById(id) {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/message/' + id,
    method: 'GET',
  });
}

export function addMessage(newMessage) {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/message/',
    method: 'POST',
    body: JSON.stringify(newMessage),
  });
}

export function editMessage(newMessage, id) {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/message/' + id,
    method: 'PUT',
    body: JSON.stringify(newMessage),
  });
}

export function deleteMessage(id) {
  return request({
    url: process.env.API_URL + '/api/v1/feedback/message/' + id,
    method: 'DELETE',
  });
}
