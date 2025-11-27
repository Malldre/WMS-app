import { Task, TaskStatusColor, TaskTypeTranslate } from '@/src/types/tasks';
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

interface CardTasksProps {
  item: Task;
  onPress?: () => void;
}

export default function CardTasks({ item, onPress }: CardTasksProps) {
  const router = useRouter();

  if (!item) {
    return null;
  }

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/private/invoiceDetails',
        params: {
          taskId: item.id,
          taskData: JSON.stringify(item),
        },
      });
    }
  };

  return (
    <Box w='$full' mb='$2'>
      <HStack bg='$white' w='$full' h={height * 0.12} borderRadius={14}>
        <VStack w='$1/2' h='$full' justifyContent='flex-start'>
            <Box
              alignItems='center'
              justifyContent='center'
              bg={TaskStatusColor[item.status]}
              w='$32'
              h='$8'
              borderTopLeftRadius={14}
              borderBottomRightRadius={14}
              >
                <Text size='sm' color='$white' fontWeight='$bold' shadowColor='$coolGray500'>
                  {TaskTypeTranslate[item.taskType]}
                </Text>
            </Box>
            <VStack pl='$2' pt='$1' gap='$0.5' flex={1} justifyContent='center'>
              <HStack gap='$1' alignItems='center'>
                <Text size='sm' fontWeight='$bold'>ID: </Text>
                <Text size='sm'>{item.title.split('-')[1]}</Text>
              </HStack>
              <HStack gap='$1' alignItems='center'>
                <Text size='sm' fontWeight='$bold'>Descrição: </Text>
                <Text size='sm' numberOfLines={1} ellipsizeMode="tail" flex={1}>{item.description}</Text>
              </HStack>
              {item.itemSpecification && (
                <HStack gap='$1' alignItems='center'>
                  <Text size='sm' fontWeight='$bold'>Especificação: </Text>
                  <Text size='sm' numberOfLines={1} ellipsizeMode="tail" flex={1}>{item.itemSpecification}</Text>
                </HStack>
              )}
            </VStack>
        </VStack>
        <Center pr='$2' w='$1/2' justifyContent='center' alignItems='flex-end'>
          <Pressable onPress={handlePress}>
            <ChevronRight color='#0F0F1A' size={32} />
          </Pressable>
        </Center>
      </HStack>
    </Box>
  )
}
