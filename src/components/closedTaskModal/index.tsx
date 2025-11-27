import React from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Modal,
  ModalBackdrop,
  ModalContent,
  Pressable,
  Icon,
} from '@gluestack-ui/themed';
import { X } from 'lucide-react-native';
import { Task, TaskStatusColor, TaskTypeTranslate } from '@/src/types/tasks';

interface ClosedTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function ClosedTaskModal({ isOpen, onClose, task }: ClosedTaskModalProps) {
  if (!task) return null;

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bg="transparent" w="90%" mx="$4" p="$0">
        <Box bg="$white" borderRadius="$2xl" overflow="hidden">
          <Box bg="#0F0F1A" px="$5" py="$4">
            <HStack justifyContent="space-between" alignItems="center">
              <Text size="xl" fontWeight="$bold" color="$white">
                Nota: {task.invoiceId || task.title || 'N/A'}
              </Text>
              <Pressable onPress={onClose} accessibilityLabel="Fechar">
                <Icon as={X} size="xl" color="$white" />
              </Pressable>
            </HStack>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
            <VStack space="md" p="$5">
              <Box>
                <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$2">
                  Descrição:
                </Text>
                <Text size="sm" color="#0F0F1A">
                  {task.description || 'N/A'}
                </Text>
                {task.itemSpecification && (
                  <Text size="sm" color="#0F0F1A" mt="$2">
                    {task.itemSpecification}
                  </Text>
                )}
              </Box>

              {task.itemSpecification && (
                <Box>
                  <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$2">
                    Especificação de item:
                  </Text>
                  <Text size="sm" color="#0F0F1A">
                    {task.itemSpecification}
                  </Text>
                </Box>
              )}

              <Box>
                <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$1">
                  Data de entrada:
                </Text>
                <Text size="sm" color="#0F0F1A">
                  {formatDate(task.createdAt)}
                </Text>
              </Box>

              <Box>
                <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$1">
                  Hora de entrada:
                </Text>
                <Text size="sm" color="#0F0F1A">
                  {formatTime(task.createdAt)}
                </Text>
              </Box>

              <Box>
                <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$1">
                  Nota expedida por:
                </Text>
                <Text size="sm" color="#0F0F1A">
                  {task.createdBy || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$1">
                  Prazo de conclusão até:
                </Text>
                <Text size="sm" color="#0F0F1A">
                  {formatDate(task.dueDate)}
                </Text>
              </Box>

            </VStack>
          </ScrollView>
        </Box>
      </ModalContent>
    </Modal>
  );
}
