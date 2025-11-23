import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/src/core/api';
import { LoginDTO, loginService } from '@/src/auth/services/login.service';

type User = { id: string; name: string };

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
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

      const { data } = await api.get<User>('/me');
      setUser(data);
    } catch {
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

    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
