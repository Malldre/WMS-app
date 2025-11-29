import { apiService } from '@/src/services/api.service';
import { UserProfile } from '@/src/types/user';

export async function getUserProfile(): Promise<UserProfile> {
  const { data } = await apiService.get<any>('/auth/profile');
  console.log('Dados do perfil recebidos da API:', data);
  return data;
}

export async function updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  const { data } = await apiService.put<UserProfile>('/auth/profile', profile);
  return data;
}
