import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('veg_pos_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // Do not clear token or reload if the failed request is the login attempt itself
      if (!err.config?.url?.includes('/auth/login')) {
        localStorage.removeItem('veg_pos_token');
        localStorage.removeItem('veg_pos_user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export default client;
