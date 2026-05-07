import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const userId = useAuthStore.getState().userId;
  if (userId) {
    config.headers['x-user-id'] = userId;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Poderia redirecionar para login
    }
    return Promise.reject(error);
  }
);

export default api;
