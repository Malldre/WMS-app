import React, { memo } from 'react';
import { ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Box, HStack, VStack, Text, Icon, Pressable } from '@gluestack-ui/themed';
import { ArrowLeft, Info } from 'lucide-react-native';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';

type Dev = { id: string; name: string; avatar?: any };

const DEVELOPERS: Dev[] = [
  { id: 'adriano', name: 'Adriano Vitoriano' },
  { id: 'luiz', name: 'Luiz Felipe Pereira Leite' },
  { id: 'marlon', name: 'Marlon P F Rodrigues' },
  { id: 'leo', name: 'Leonardo Machado' },
  { id: 'diego', name: 'Diego dos Santos Nunes' },
];

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

function DeveloperItem({ name, avatar }: { name: string; avatar?: any }) {
  return (
    <Box alignItems="center" my="$2">
      <HStack alignItems="center" space="md">
        <Box
          borderRadius="$full"
          width={48}
          height={48}
          bg="$coolGray300"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          {avatar ? (
            <Image source={avatar} style={{ width: 48, height: 48 }} />
          ) : (
            <Text fontWeight="$semibold" color="$typography900">{initials(name)}</Text>
          )}
        </Box>

        <Box
          px="$4"
          py="$3"
          borderRadius="$full"
          bg="$typography900"
          minWidth={220}
          alignItems="flex-start"
        >
          <Text fontWeight="$semibold" numberOfLines={1}>
            {name}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default function AboutScreen() {
  const router = useRouter();

  return (
    <Box flex={1} bg="$background950">

      <HeaderWithSettings />

      <Box
        bgColor='$white'
        px="$6"
        pt="$6"
        mt='-$8'
        gap="$4"
        borderTopLeftRadius={38}
        borderTopRightRadius={38}
      >
        <HStack p='$2' mt='-$4' alignItems='center' justifyContent='space-between'>
          <Pressable onPress={() => router.back()} accessibilityLabel="Voltar">
            <Icon as={ArrowLeft} size="xl" />
          </Pressable>
          <Text size='2xl' color='#0F0F1A' bold>
            Sobre
          </Text>
          <Icon as={Info} size="xl" />
        </HStack>
      </Box>

      <Box
        flex={1}
        p="$5"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="md">
            <Text color="$typography900">
              A solução inteligente para o gerenciamento de tarefas e controle de processos.
              Organize sua equipe, optimize seu fluxo de trabalho e tenha o controle do seu negócio na palma da mão.
            </Text>

            <Box alignItems="center" mt="$2">
              <Text fontWeight="$bold" color="$typography900">Desenvolvido por:</Text>
            </Box>

            <VStack>
              {DEVELOPERS.map((d) => (
                <DeveloperItem key={d.id} name={d.name} avatar={d.avatar} />
              ))}
            </VStack>

            <Box alignItems="center" mt="$4" mb="$6">
              <Text size="xs" color="$secondary600">Versão 1.0.0 ©️ 2025 Malldre</Text>
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};