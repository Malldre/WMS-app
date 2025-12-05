import React, { useState, useEffect } from 'react';
import { ScrollView, Linking } from 'react-native';
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
  Spinner,
} from '@gluestack-ui/themed';
import { X, ChevronRight, FileText } from 'lucide-react-native';
import { Task, TaskStatusColor, TaskTypeTranslate } from '@/src/types/tasks';
import { invoiceService } from '@/src/services/invoice.service';
import { InvoiceItem, ConferenceData } from '@/src/types/invoice';
import { useQuery } from '@tanstack/react-query';

interface ClosedTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function ClosedTaskModal({ isOpen, onClose, task }: ClosedTaskModalProps) {
  if (!task) return null;

  const [openItemIds, setOpenItemIds] = useState<Set<string>>(new Set());

  const { data: invoiceItems = [], isLoading: loadingItems } = useQuery({
    queryKey: ['invoice-items', task?.invoiceId],
    queryFn: () => invoiceService.getInvoiceItems(task!.invoiceId!),
    enabled: !!task?.invoiceId && isOpen,
  });

  const toggleItem = (uuid: string) => {
    setOpenItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) {
        next.delete(uuid);
      } else {
        next.add(uuid);
      }
      return next;
    });
  };

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
              <Pressable ml="-$5" onPress={onClose} accessibilityLabel="Fechar">
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

              {/* Lista de itens com anexos */}
              {loadingItems ? (
                <Box py="$4" alignItems="center">
                  <Spinner size="small" color="#0F0F1A" />
                  <Text size="sm" color="#0F0F1A" mt="$2">
                    Carregando itens...
                  </Text>
                </Box>
              ) : invoiceItems.length > 0 ? (
                <Box mt="$4">
                  <Text size="sm" fontWeight="$bold" color="#0F0F1A" mb="$3">
                    Itens da Nota:
                  </Text>
                  <VStack space="sm">
                    {invoiceItems.map((item) => (
                      <ItemAccordion
                        key={item.uuid}
                        item={item}
                        isOpen={openItemIds.has(item.uuid)}
                        onToggle={() => toggleItem(item.uuid)}
                      />
                    ))}
                  </VStack>
                </Box>
              ) : null}

            </VStack>
          </ScrollView>
        </Box>
      </ModalContent>
    </Modal>
  );
}

function ItemAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: InvoiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { data: conferenceData, isLoading } = useQuery({
    queryKey: ['conference', item.uuid],
    queryFn: () => invoiceService.getConferenceData(item.uuid),
    enabled: isOpen,
  });

  const handleAttachmentPress = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir anexo:', err);
      alert('Não foi possível abrir o anexo');
    });
  };

  return (
    <Box
      borderRadius="$lg"
      borderWidth={1}
      borderColor="$coolGray300"
      overflow="hidden"
    >
      <Pressable onPress={onToggle}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          px="$3"
          py="$3"
          bg={isOpen ? '#0F0F1A' : '$white'}
        >
          <Box flex={1}>
            <Text
              fontWeight="$semibold"
              fontSize={13}
              color={isOpen ? '$white' : '#0F0F1A'}
            >
              {item.materialName}
            </Text>
            {item.materialDescription && (
              <Text
                fontSize={11}
                color={isOpen ? '$coolGray300' : '$coolGray600'}
                mt="$1"
              >
                {item.materialDescription}
              </Text>
            )}
          </Box>
          <Icon
            as={ChevronRight}
            size="md"
            color={isOpen ? '$white' : '#0F0F1A'}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
        </HStack>
      </Pressable>

      {isOpen && (
        <Box px="$3" pb="$3" pt="$2" bg="$coolGray50">
          <Text fontSize={12} fontWeight="$bold" color="#0F0F1A" mb="$2">
            Anexos do item: {item.materialName}
          </Text>

          {isLoading ? (
            <Box py="$3" alignItems="center">
              <Spinner size="small" color="#0F0F1A" />
            </Box>
          ) : conferenceData?.attachments && conferenceData.attachments.length > 0 ? (
            <VStack space="xs">
              {conferenceData.attachments.map((attachment) => (
                <Pressable
                  key={attachment.id}
                  onPress={() => handleAttachmentPress(attachment.fileUrl)}
                >
                  <HStack
                    alignItems="center"
                    space="sm"
                    p="$2"
                    bg="$white"
                    borderRadius="$md"
                    borderWidth={1}
                    borderColor="$coolGray200"
                  >
                    <Icon as={FileText} size="sm" color="#0F0F1A" />
                    <VStack flex={1}>
                      <Text fontSize={12} color="#0F0F1A" numberOfLines={1}>
                        {attachment.fileName}
                      </Text>
                      <Text fontSize={10} color="$coolGray600">
                        {new Date(attachment.uploadedAt).toLocaleDateString('pt-BR')}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          ) : (
            <Text fontSize={11} color="$coolGray600" textAlign="center" py="$2">
              Nenhum anexo encontrado
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
