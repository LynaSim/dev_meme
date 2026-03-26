import axios from 'axios';

import mockAxios from './mock/api';

// Leave baseURL out or set to '/' so it uses the Render domain in production
// baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001',
const apiAxios = axios.create({
  baseURL: '/', 
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('token found and now attached to header');
  } else {
    console.log('No token found in LocalStorage, normal for 1st time login')
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const shouldUseMock = import.meta.env.REACT_APP_USE_MOCK_API === "true";
const api = shouldUseMock ? mockAxios :apiAxios;

//export default mockAxios
export default api;
