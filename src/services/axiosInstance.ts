import axios from "axios";
import { getSecureCookie } from "../utils/cookiesHelper";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
  headers:
  {
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use((config) => {
    const token = getSecureCookie("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
export default axiosInstance;