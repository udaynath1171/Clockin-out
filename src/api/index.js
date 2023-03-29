import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

// Add a request interceptor
http.interceptors.request.use((config) => {
  const USER_DATA = localStorage.getItem('logged_user') ? JSON.parse(localStorage.getItem('logged_user')) : null
  config.headers.Authorization = `Bearer ${USER_DATA ? USER_DATA.jwt_token : null}`;
  return config;
});

// Add a response interceptor
http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login'
  }
  return Promise.reject(error)
});

export default http
