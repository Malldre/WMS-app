import { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';
import AccordionList, { AccordionItem } from '@/src/components/accordion/accordionList';
import { Task, TaskStatusColor, TaskTypeTranslate } from '@/src/types/tasks';
import { invoiceService } from '@/src/services/invoice.service';
import { useSession } from '@/src/auth/useSession';

export default function InvoiceDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [productOpen, setProductOpen] = useState(true);
  const { user } = useSession();

  const taskData: Task | null = useMemo(() => {
    if (params.taskData && typeof params.taskData === 'string') {
      try {
        console.log(JSON.parse(params.taskData));
        return JSON.parse(params.taskData) as Task;
      } catch (error) {
        console.error('Erro ao fazer parse dos dados da tarefa:', error);
        return null;
      }
    }
    return null;
  }, [params.taskData]);
  console.log('Dados da tarefa:', taskData);
  const { data: invoiceItems = [], isLoading } = useQuery({
    queryKey: ['invoice-items', '9924c1d6-89b5-4088-b628-3ae34511708a'],
    queryFn: () => invoiceService.getInvoiceItems('9924c1d6-89b5-4088-b628-3ae34511708a'),
    enabled: !!taskData?.uuid,
  });
  console.log('Itens da nota fiscal:', invoiceItems, taskData);
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const accordionItems: AccordionItem[] = invoiceItems
    .filter((item) => item && item.uuid)
    .map((item) => ({
      id: item.uuid,
      title: `${item.materialId} - ${item.materialName || 'N/A'}`,
      subtitle: item.materialDescription,
      textContent: `Quantidade: ${item.quantity || '0'} | Preço unitário: R$ ${parseFloat(item.unitValue || '0').toFixed(2)} | Total: R$ ${parseFloat(item.totalValue || '0').toFixed(2)}`,
      uuid: item.uuid,
    }));

  return (
    <Box flex={1} bg="$background950">
      <HeaderWithSettings />

      <Box
        bg="$white"
        px="$5"
        pt="$6"
        mt="-$8"
        borderTopLeftRadius={28}
        borderTopRightRadius={28}
      >
        <HStack p="$2" mt="-$4" alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => router.back()} accessibilityLabel="Voltar">
            <Icon as={ArrowLeft} size="xl" />
          </Pressable>

          <Text fontWeight="$bold" color="#0F0F1A">
            {taskData?.title.split(' - ')[1] || 'N/A'}
          </Text>

          <Box width={28} />
        </HStack>
      </Box>

      <Box flex={1} p="$4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="md" mt="$3" px="$2" pb="$8">
            <Box alignItems="flex-start">
              <Box
                bg={taskData ? TaskStatusColor[taskData.status] : "$success300"}
                px="$3"
                py="$1"
                borderRadius="$lg"
                alignSelf="flex-start"
              >
                <Text color="$white" fontWeight="$semibold">
                  {taskData ? TaskTypeTranslate[taskData.taskType] : 'Conferência'}
                </Text>
              </Box>
            </Box>

            <Box
              bg="#0F0F1A"
              borderRadius="$lg"
              px="$4"
              py="$3"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 6 }}
              shadowOpacity={0.14}
              shadowRadius={12}
              elevation={8}
            >
              <VStack gap="$2">
                <Text color="$white">
                  Data de entrada:{' '}
                  <Text color="$white" fontWeight="$semibold">
                    {formatDate(taskData?.createdAt)}
                  </Text>
                </Text>
                <Text color="$white">
                  Hora de entrada:{' '}
                  <Text color="$white" fontWeight="$semibold">
                    {formatTime(taskData?.createdAt)}
                  </Text>
                </Text>
                <Text color="$white">
                  Nota expedida por:{' '}
                  <Text color="$white" fontWeight="$semibold">
                    {taskData?.issuedBy || 'N/A'}
                  </Text>
                </Text>
                <Text color="$white">
                  Prazo de conclusão até:{' '}
                  <Text color="$white" fontWeight="$semibold">
                    {formatDate(taskData?.dueDate || undefined)}
                  </Text>
                </Text>
                {taskData?.description && (
                  <Text color="$white">
                    Descrição:{' '}
                    <Text color="$white" fontWeight="$semibold">
                      {taskData.description}
                    </Text>
                  </Text>
                )}
              </VStack>
            </Box>


            <AccordionList
              items={accordionItems}
              activeTextColor="#ffffff"
              singleOpen
              userId={user?.uuid || ''}
              taskId={taskData?.uuid || ''}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}
