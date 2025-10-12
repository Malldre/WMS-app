import { Stack, Redirect } from 'expo-router';
import { useSession } from '@/src/auth/useSession';

export default function PrivateLayout() {
  const { isAuthenticated, loading } = useSession();
  if (loading) return null;

  // if (!isAuthenticated) return <Redirect href="/auth/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
