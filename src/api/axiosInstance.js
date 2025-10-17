// src/api/axiosInstanceToken.js
import axios from 'axios';

const axiosInstanceToken = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // HTTP برای لوکال
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('grushell_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Sending Authorization Header:', config.headers.Authorization);
      console.log('Request Data:', config.data); // لاگ داده‌ها
    } else {
      console.warn('No token found in localStorage');
      delete config.headers.Authorization;
    }
    // مطمئن شو که داده‌ها به JSON تبدیل می‌شن
    if (config.data && typeof config.data === 'object') {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceToken.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem('grushell_access_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstanceToken;