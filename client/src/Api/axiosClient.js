import axios from "axios"


const axiosClient = axios.create()

axiosClient.defaults.baseURL = "http://localhost:3000/api/v1/";

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  
axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosClient;