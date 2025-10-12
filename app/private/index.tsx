import HeaderWithSettings from '@/src/components/headers/headerWithSettings';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { NotepadText } from 'lucide-react-native';
import { useActiveTab } from '@/src/features/tasks/hooks/useActiveTabs';
import { TAB_COMPONENTS } from '@/src/features/tasks/tabs';
import { TopTabs } from '@/src/features/tasks/components/topTabs';


export default function Home() {
  const active = useActiveTab();
  const TabScreen = TAB_COMPONENTS[active];

  return (
    <Box h='$full'>
      <HeaderWithSettings />
      <Box
        bgColor='$white'
        px="$6"
        pt="$8"
        mt='-$8'
        gap="$4"
        borderTopLeftRadius={38}
        borderTopRightRadius={38}
      >
        <HStack px='$2' mt='-$4' alignItems='center' justifyContent='space-between'>
          <Text size='2xl' color='#0F0F1A' bold>
            Tarefas
          </Text>
          <NotepadText color='#0F0F1A' size='32px' />
        </HStack>
      </Box>

      <Box bgColor='$white' px='$6' h={40} justifyContent='flex-end' alignItems='flex-end'>
        <TopTabs />
      </Box>

      <Box bg='$coolGray300' h='$full' px='$6' py='$2'>
        <TabScreen />
      </Box>
    </Box>
  );
}
