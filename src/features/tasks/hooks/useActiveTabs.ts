import { useLocalSearchParams } from 'expo-router';

export type TabKey = 'open' | 'mine' | 'closed';
export const TAB_KEYS: TabKey[] = ['open', 'mine', 'closed'];

export function useActiveTab(): TabKey {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const value = (tab ?? 'open').toString();
  return (TAB_KEYS as string[]).includes(value) ? (value as TabKey) : 'open';
}
