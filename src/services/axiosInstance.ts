import axios from "axios";
import { getSecureCookie } from "../utils/cookiesHelper";

// إنشاء نسخة من axios مع الإعدادات الافتراضية
const axiosInstance = axios.create({
  baseURL: "/api", // استخدام مسار نسبي بدلاً من المطلق
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  withCredentials: true // هذا مهم للتعامل مع الكوكيز والمصادقة
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

// إضافة معالج للأخطاء
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // طباعة تفاصيل الخطأ للتشخيص
    console.error('Axios Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    return Promise.reject(error);
  }
);
  
export default axiosInstance;
