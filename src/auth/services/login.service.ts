import { api } from '@/src/core/api';

export type LoginDTO = { email: string; password: string };
export type LoginResponse = { token?: string; user: { id: string; name: string } };

export async function loginService(payload: LoginDTO): Promise<{
  data: LoginResponse;
  setCookieHeader?: string | string[];
}> {
  const res = await api.post<LoginResponse>('/auth/login', payload);
  return { data: res.data, setCookieHeader: res.headers['set-cookie'] };
}
