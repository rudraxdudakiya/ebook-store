import axios from 'axios';
import { getToken } from "../util/common"

const baseURL = import.meta.env.VITE_BASE_URL;

console.log("baseURL" , baseURL)

const AxiosInstance = axios.create({
  baseURL,
});

AxiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if(token) 
    config.headers.Authorization=`Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
})

export default AxiosInstance;