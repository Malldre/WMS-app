import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/src/core/api';
import { LoginDTO, loginService } from '@/src/auth/services/login.service';

type User = { id: string; name: string };

function normalizeCookie(setCookie?: string | string[] | null): string | null {
  if (!setCookie) return null;
  const arr = Array.isArray(setCookie) ? setCookie : [setCookie];
  const pairs = arr.map((c) => (c ?? '').split(';')[0]).filter(Boolean);
  return pairs.length ? pairs.join('; ') : null;
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token  = await SecureStore.getItemAsync('token');
        const cookie = await SecureStore.getItemAsync('cookie');
        if (!token && !cookie) { setLoading(false); return; }

        const { data } = await api.get<User>('/me');
        setUser(data);
      } catch {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('cookie');
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (payload: LoginDTO) => {
    const { data, setCookieHeader } = await loginService(payload);

    if (data.token) await SecureStore.setItemAsync('token', data.token);

    const cookie = normalizeCookie(setCookieHeader);
    if (cookie) await SecureStore.setItemAsync('cookie', cookie);

    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('cookie');
    setUser(null);
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
