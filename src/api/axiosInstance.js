import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/', // پروکسی به Django
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("grushell_access_token") || ""}`
  },
});
export default axiosInstance;
