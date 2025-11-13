import { CardTasksColor, CardTasksTranslate } from '@/src/types/tasks';
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function CardTasks({ item }: { item: any }) {
  const router = useRouter();

  return (
    <Box w='$full' mb='$2'>
      <HStack bg='$white' w='$full' h='$20' borderRadius={14} gap='$1'>
        <VStack w='$1/2' h='$full'>
            <Box
              alignItems='center'
              justifyContent='center'
              bg={CardTasksColor[item.status]}
              w='$24'
              borderTopLeftRadius={14}
              borderBottomRightRadius={14}
              >
                <Text size='sm' color='$white' fontWeight='$bold' shadowColor='$coolGray500'>
                  {CardTasksTranslate[item.status]}
                </Text>
            </Box>
            <HStack pl='$2' gap='$1'>
              <Text size='sm' fontWeight='$bold'>Nota: </Text>
              <Text size='sm'>{ item.nota }</Text>
            </HStack>
            <HStack pl='$2' gap='$1' >
              <Text size='sm' fontWeight='$bold'>Descrição: </Text>
              <Text size='sm' numberOfLines={1} ellipsizeMode="tail">{ item.descricao }</Text>
            </HStack>
            <HStack pl='$2' gap='$1'>
              <Text size='sm' fontWeight='$bold'>Especificação do item: </Text>
              <Text size='sm'>{ item.especi }</Text>
            </HStack>
        </VStack>
        <Center pr='$2' w='$1/2' justifyContent='center' alignItems='flex-end'>
          <Pressable onPress={() => router.push('/private/invoiceDetails')}>
            <ChevronRight color='#0F0F1A' size={32} />
          </Pressable>
        </Center>
      </HStack>
    </Box>
  )
}
