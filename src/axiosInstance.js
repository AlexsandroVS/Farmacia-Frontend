import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://alexsandrovs.pythonanywhere.com/api/',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token"); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  response => response, 
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const { data } = await axios.post('https://alexsandrovs.pythonanywhere.com/api/token/refresh/', {
            refresh: refreshToken,
          });
          localStorage.setItem("access_token", data.access);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("No se pudo refrescar el token. Redirigiendo al login.");
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
