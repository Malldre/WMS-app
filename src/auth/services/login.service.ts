import { apiService } from '@/src/services/api.service';
import * as SecureStore from 'expo-secure-store';

export type LoginDTO = { email: string; password: string };
export type LoginResponse = { access_token?: string; user: { id: string; name: string } };

export async function loginService(payload: LoginDTO): Promise<LoginResponse> {
  const res = await apiService.post<LoginResponse>('/auth/login', payload);

  if (res.data.access_token) {
    await SecureStore.setItemAsync('token', res.data.access_token);
  }

  return res.data;
}
