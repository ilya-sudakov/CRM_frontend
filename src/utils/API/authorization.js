import { request } from '../utilsAPI.jsx';

export function login(loginRequest) {
  return request({
    url: process.env.API_URL + '/api/v1/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
}

export function refreshToken(refreshToken) {
  return request({
    url: process.env.API_URL + '/api/v1/auth/refreshToken',
    method: 'POST',
    body: JSON.stringify(refreshToken),
  });
}
