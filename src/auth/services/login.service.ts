import { api } from '@/src/core/api';
import * as SecureStore from 'expo-secure-store';

export type LoginDTO = { email: string; password: string };
export type LoginResponse = { access_token?: string; user: { id: string; name: string } };

export async function loginService(payload: LoginDTO): Promise<LoginResponse> {
  console.log('🔐 Iniciando login...');

  const res = await api.post<LoginResponse>('/auth/login', payload);

  console.log('📦 Resposta recebida');

  if (!res.data.access_token) {
    console.error('❌ Token não retornado pelo servidor');
    throw new Error('Token não retornado na resposta');
  }

  console.log('💾 Salvando token...');
  await SecureStore.setItemAsync('token', res.data.access_token);

  const tokenSalvo = await SecureStore.getItemAsync('token');
  console.log('🔍 Token verificado:', tokenSalvo ? 'SALVO' : 'FALHOU');

  if (!tokenSalvo) {
    throw new Error('Falha ao persistir token');
  }

  console.log('✅ Login completo');
  return res.data;
}
