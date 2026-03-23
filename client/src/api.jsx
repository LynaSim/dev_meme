import axios from 'axios';

import mockAxios from './mock/api';

const apiAxios = axios.create({
  baseURL: 'http://localhost:3001',
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
