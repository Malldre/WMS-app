import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Box, VStack, HStack, Text, Icon, Divider, Button } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import BindModal from '../bindModal';
import ProductConferenceModal from '../productConferenceModal';

export type AccordionItem = {
  id: string;
  title: string;
  subtitle?: string;
  textContent?: string;
};

export default function AccordionList({
  items,
  activeBg = '#0F0F1A',
  activeTextColor = '#ffffff',
  singleOpen = false,
}: {
  items: AccordionItem[];
  activeBg?: string;
  activeTextColor?: string;
  singleOpen?: boolean;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [conferenceOpen, setConferenceOpen] = useState(false);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (singleOpen) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const onConfirmBind = () => {
    setConfirmOpen(false);
    setConferenceOpen(true);
  }

  const onConfirmConference = () => {
    setConferenceOpen(false);
  }

  return (
    <VStack>
      {items.map((it) => {
        const isOpen = openIds.has(it.id);
        return (
          <Box
            key={it.id}
            mb="$2"
            borderRadius="$lg"
            overflow="hidden"
            borderWidth={1}
            borderColor="$coolGray200"
          >
            <Pressable
              onPress={() => toggle(it.id)}
              accessibilityRole="button"
              accessibilityLabel={`Alternar ${it.title}`}
            >
              <HStack
                alignItems="center"
                justifyContent="space-between"
                px="$4"
                py="$3"
                bg={isOpen ? activeBg : '$white'}
              >
                <Box w='90%'>
                  <Text fontWeight="$semibold" color={isOpen ? activeTextColor : '#0F0F1A'}>
                    {it.title}
                  </Text>
                  {it.subtitle ? (
                    <Text size="sm" color={isOpen ? activeTextColor : '$secondary600'} mt="$1">
                      {it.subtitle}
                    </Text>
                  ) : null}
                </Box>

                <Icon
                  as={ChevronRight}
                  size="md"
                  color={isOpen ? activeTextColor : '#0F0F1A'}
                  style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
                />
              </HStack>
            </Pressable>

            {isOpen && (
              <Box px="$4" pb="$4" bg="$white">
                <Divider />
                <VStack mt="$3">
                  <Text size="sm" color="$typography900">
                    Código interno:{' '}
                    <Text fontWeight="$semibold" color="$typography900">
                      {it.title}
                    </Text>
                  </Text>
                  <Text mt="$2" color="$typography900">
                    {it.textContent}
                  </Text>
                  <Button mt="$4" bgColor="#0F0F1A" px="$5" py="$3" borderRadius="$md" onPress={() => setConfirmOpen(!confirmOpen)}>
                    <Text color="$white" fontWeight="$bold">Vincular Tarefa</Text>
                  </Button>
                </VStack>
              </Box>
            )}
          </Box>
        );
      })}

      <BindModal
        visible={confirmOpen}
        title="Deseja realmente iniciar a CONFERÊNCIA?"
        message="Você será vinculado a esse item!"
        onConfirm={onConfirmBind}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />

      <ProductConferenceModal
        visible={conferenceOpen}
        onCancel={() => setConferenceOpen(false)}
        onSubmit={onConfirmConference}
      />
    </VStack>
  );
}
