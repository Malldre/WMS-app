import { apiService } from '@/src/services/api.service';
import { UserProfile } from '@/src/types/user';

export async function getUserProfile(): Promise<UserProfile> {
  const { data } = await apiService.get<UserProfile>('/auth/profile');
  return data;
}

export async function updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  const { data } = await apiService.put<UserProfile>('/auth/profile', profile);
  return data;
}
