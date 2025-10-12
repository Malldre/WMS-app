import { Redirect } from 'expo-router';
import { useSession } from '@/src/auth/useSession';

export default function Index() {
  const { isAuthenticated, loading } = useSession();
  if (loading) return null;

  return isAuthenticated ? <Redirect href="/private" /> : <Redirect href="/auth/login" />;
}
