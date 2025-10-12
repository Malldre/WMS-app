import { Link } from 'expo-router';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { TABS_META } from '../tabs';
import { useActiveTab } from '../hooks/useActiveTabs';

export function TopTabs() {
  const active = useActiveTab();

  return (
    <Box flexDirection="row" overflow="hidden">
      {TABS_META.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <Link
            key={key}
            href={{ pathname: '/private', params: { tab: key } }}
            asChild
          >
            <Pressable
              flex={1}
              px="$2"
              py="$2"
              alignItems="center"
              bg={isActive ? '$primary900' : '$white'}
              borderTopLeftRadius={isActive ? 8 : 0}
              borderTopRightRadius={isActive ? 8 : 0}
            >
              <Text textAlign='center' size="sm" fontWeight="$bold" color={isActive ? '$white' : '$typography900'}>
                {label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </Box>
  );
}
