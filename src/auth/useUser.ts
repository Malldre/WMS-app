import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type UserInfo = {
  id: number;
  email: string;
  name?: string;
};

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
          console.error('Token JWT inválido');
          setUser(null);
          setLoading(false);
          return;
        }

        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const decoded = JSON.parse(jsonPayload);

        setUser({
          id: decoded.sub || decoded.userId || decoded.id,
          email: decoded.email,
          name: decoded.name,
        });
      } catch (error) {
        console.error('Erro ao carregar usuário do token:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, loading };
}
