import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '@/src/config/queryClient';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
