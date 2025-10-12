import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENV } from '@/src/config/env';

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15_000,
});

api.interceptors.request.use(async (config) => {
  const token  = await SecureStore.getItemAsync('token');
  const cookie = await SecureStore.getItemAsync('cookie');

  config.headers = config.headers ?? {};

  if (token)  config.headers.Authorization = `Bearer ${token}`;
  if (cookie) config.headers.Cookie        = cookie;

  return config;
});
