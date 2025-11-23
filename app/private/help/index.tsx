import React, { memo, useCallback } from 'react';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Pressable,
  Divider,
} from '@gluestack-ui/themed';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';

const SUPPORT_EMAIL = 'suporte@malldre.com';
const SUPPORT_PHONE = '[XX] XXXX-XXXX';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text fontWeight="$semibold" color="$typography900" textAlign="center" mb="$2">
      {children}
    </Text>
  );
}

export default function HelpScreen() {
  const router = useRouter();

  const openEmail = useCallback(() => {
    const url = `mailto:${SUPPORT_EMAIL}?subject=Suporte%20Malldre`;
    Linking.canOpenURL(url).then((supported) => supported && Linking.openURL(url));
  }, []);

  const openPhone = useCallback(() => {
    const url = `tel:${SUPPORT_PHONE.replace(/\D/g, '')}`;
    Linking.canOpenURL(url).then((supported) => supported && Linking.openURL(url));
  }, []);

  return (
    <Box flex={1} >
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

          <Text size="2xl" color="#0F0F1A" fontWeight="$bold">
            Ajuda
          </Text>

          <Pressable accessibilityLabel="Ajuda" onPress={() => {}}>
            <Icon as={HelpCircle} size="xl" />
          </Pressable>
        </HStack>
      </Box>

      <Box flex={1} p="$4">
        <VStack space="lg" mt="$3" px="$3">
          <Box alignItems="center">
            <Text fontWeight="$semibold" color="$typography900" mb="$2">
              Precisa de Ajuda?
            </Text>

            <Divider />

            <Text color="$typography900" mt="$3" textAlign="center" px="$4">
              Nossa equipe de suporte está pronta para atender você.
            </Text>
          </Box>

          <Box>
            <SectionTitle>Via E-mail:</SectionTitle>
            <Divider />
            <Text color="$typography900" mt="$3" textAlign="center" px="$4">
              Para dúvidas, solicitações ou problemas técnicos, envie um chamado para:
            </Text>

            <Pressable onPress={openEmail} accessibilityRole="link" accessibilityLabel="Enviar e-mail para suporte">
              <Text
                color="$primary600"
                fontWeight="$semibold"
                textAlign="center"
                mt="$3"
              >
                {SUPPORT_EMAIL}
              </Text>
            </Pressable>
          </Box>

          <Box>
            <SectionTitle>Via Telefone:</SectionTitle>
            <Divider />
            <Text color="$typography900" mt="$3" textAlign="center" px="$4">
              Para suporte imediato, entre em contato:
            </Text>

            <Pressable onPress={openPhone} accessibilityRole="link" accessibilityLabel="Ligar para suporte">
              <Text
                color="$primary600"
                fontWeight="$semibold"
                textAlign="center"
                mt="$3"
              >
                {SUPPORT_PHONE}
              </Text>
            </Pressable>
          </Box>

          <Box alignItems="center" mt="$6" mb="$8">
            <Text size="xs" color="$secondary600">Estamos aqui para ajudar — equipe Malldre</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
