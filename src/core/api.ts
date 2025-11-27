import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENV } from '@/src/config/env';

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15_000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Token adicionado ao header');
      } else {
        console.warn('⚠️ Nenhum token encontrado para:', config.url);
      }
    } catch (error) {
      console.error('❌ Erro ao buscar token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('🚫 Token inválido ou expirado');
      await SecureStore.deleteItemAsync('token');
    }
    return Promise.reject(error);
  }
);
