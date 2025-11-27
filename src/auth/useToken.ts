import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useHasToken() {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const tokenExists = !!token;

        console.log('🔑 useHasToken - Token existe?', tokenExists);

        if (mounted) {
          setHasToken(tokenExists);
        }
      } catch (error) {
        console.error('❌ Erro ao verificar token:', error);
        if (mounted) {
          setHasToken(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { hasToken, loading };
}
