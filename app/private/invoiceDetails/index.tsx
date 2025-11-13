import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Pressable,
  Divider,
  Button,
} from '@gluestack-ui/themed';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';

type LinkedItem = { id: string; label: string; subtitle?: string };

const MOCK_LINKS: LinkedItem[] = [
  { id: '1', label: '1585223 - Martelo - 65489' },
  { id: '2', label: '6698745 - Parafuso - 66987' },
  { id: '3', label: '1988775 - Chave de fenda - 69875' },
  { id: '4', label: '3225566 - Furadeira - 33255' },
  { id: '5', label: '6998786 - Broca - 699875' },
];

export default function InvoiceDetails() {
  const router = useRouter();
  const [productOpen, setProductOpen] = useState(true);

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

          <Text size="lg" fontWeight="$bold" color="#0F0F1A">
            Nota: <Text as="span" fontWeight="$bold">1234567</Text>
          </Text>

          <Box width={28} />
        </HStack>
      </Box>
      <Box
        flex={1}
        p="$4"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="md" mt="$3" px="$2" pb="$8">
            <Box alignItems="flex-start">
              <Box
                bg="$success300"
                px="$3"
                py="$1"
                borderRadius="$lg"
                alignSelf="flex-start"
              >
                <Text color="$success900" fontWeight="$semibold">Conferência</Text>
              </Box>
            </Box>

            <Box
              bg="$typography900"
              borderRadius="$lg"
              px="$4"
              py="$3"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 6 }}
              shadowOpacity={0.14}
              shadowRadius={12}
              elevation={8}
            >
              <VStack space="$2">
                <Text color="$white">Data de entrada: <Text as="span" color="$white" fontWeight="$semibold">11/02/2025</Text></Text>
                <Text color="$white">Hora de entrada: <Text as="span" color="$white" fontWeight="$semibold">12:55:42</Text></Text>
                <Text color="$white">Nota expedida por: <Text as="span" color="$white" fontWeight="$semibold">Fulano Ciclano da Silva</Text></Text>
                <Text color="$white">Prazo de conclusão até: <Text as="span" color="$white" fontWeight="$semibold">10/10/2025</Text></Text>
              </VStack>
            </Box>

            <Box bg="$white" borderRadius="$lg" overflow="hidden" borderWidth={1} borderColor="$coolGray200">
              <Pressable onPress={() => setProductOpen((s) => !s)} accessibilityLabel="Alternar produto">
                <HStack alignItems="center" justifyContent="space-between" px="$4" py="$3">
                  <Text fontWeight="$semibold">Código do produto: <Text as="span" fontWeight="$bold">100500110</Text></Text>
                  <Icon as={ChevronRight} size="sm" style={{ transform: [{ rotate: productOpen ? '90deg' : '0deg' }] }} />
                </HStack>
              </Pressable>

              {productOpen && (
                <Box px="$4" pb="$4">
                  <Divider />
                  <VStack space="$3" pt="$3">
                    <Text fontWeight="$semibold">Especificação do item: <Text as="span" fontWeight="$normal">Bota CAT-23456</Text></Text>

                    <Text>
                      <Text fontWeight="$semibold">Descrição: </Text>
                      Bota legal de equipamento de segurança e bla bla bla.
                    </Text>

                    <Box alignItems="center" mt="$2">
                      <Button bgColor="#0F0F1A" px="$5" py="$3" borderRadius="$md" onPress={() => { /* vincular tarefa */ }}>
                        <Text color="$white" fontWeight="$bold">VINCULAR TAREFA</Text>
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}
            </Box>

            <Box>
              {MOCK_LINKS.map((it) => (
                <Pressable
                  key={it.id}
                  onPress={() => { /* abrir item */ }}
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir ${it.label}`}
                >
                  <HStack alignItems="center" justifyContent="space-between" px="$3" py="$3" bg={it.id === '1' ? '$coolGray100' : '$white'}>
                    <Text>{it.label}</Text>
                    <Icon as={ChevronRight} size="sm" />
                  </HStack>

                  <Divider />
                </Pressable>
              ))}
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}
