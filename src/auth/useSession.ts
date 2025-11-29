import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { LoginDTO, loginService } from '@/src/auth/services/login.service';
import { getUserProfile } from '@/src/auth/services/profile.service';
import { UserProfile } from '@/src/types/user';

export function useSession() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(async () => {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const profile = await getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
      await clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (payload: LoginDTO) => {
    const response = await loginService(payload);

    if (!response.access_token) {
      throw new Error('Token de acesso não retornado');
    }

    // Após o login, busca o perfil completo do usuário
    const profile = await getUserProfile();
    setUser(profile);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
