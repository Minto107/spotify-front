import axios from "axios";

const url = process.env.API_URL === undefined ? 'http://localhost:8080/api' : process.env.API_URL;

const axiosInstance = axios.create({
  // baseURL: `${process.env.API_URL}`
  baseURL: `${url}`,
  withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});

axiosInstance.interceptors.request.use((config) => {
  // if (typeof window !== 'undefined'){
  //   const token = localStorage.getItem('accessToken'); 
  //   if (token) {
  //     console.log('securing requests')
  //     config.headers['Authorization'] = 'Bearer ' + token; // Set the token to the authorization header
  //   }
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
