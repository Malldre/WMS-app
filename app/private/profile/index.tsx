import React from 'react';
import { Pressable, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
  Divider,
} from '@gluestack-ui/themed';
import { ArrowLeft, User, Camera } from 'lucide-react-native';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';
import { useSession } from '@/src/auth/useSession';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading } = useSession();

  if (loading) {
    return (
      <Box flex={1} bg="$background950" alignItems="center" justifyContent="center">
        <Text>Carregando...</Text>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box flex={1} bg="$background950" alignItems="center" justifyContent="center">
        <Text>Usuário não encontrado</Text>
      </Box>
    );
  }

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

          <Text size="2xl" color="#0F0F1A" fontWeight="$bold">
            Perfil
          </Text>

          <Pressable accessibilityLabel="Perfil">
            <Icon as={User} size="xl" />
          </Pressable>
        </HStack>
      </Box>

      <Box flex={1} p="$4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="lg" mt="$3" px="$3" pb="$8">
            <HStack alignItems="center" justifyContent='center' space="md" mt="$2">
              <Text fontWeight="$semibold" color="$typography900" numberOfLines={2}>
                {user.name}
              </Text>
            </HStack>

            <Divider />

            <VStack space="$3">
              {user.position && (
                <>
                  <Box>
                    <Text fontWeight="$bold" color="$typography900">Cargo:</Text>
                    <Text>{user.position}</Text>
                  </Box>
                  <Divider />
                </>
              )}

              {user.registration && (
                <>
                  <Box>
                    <Text fontWeight="$bold" color="$typography900">Matrícula:</Text>
                    <Text>{user.registration}</Text>
                  </Box>
                  <Divider />
                </>
              )}

              <Box>
                <Text fontWeight="$bold" color="$typography900">E-mail:</Text>
                <Text>{user.email}</Text>
              </Box>
            </VStack>

            <Box alignItems="center" mt="$4">
              <Button
                bgColor="#0F0F1A"
                onPress={() => router.push('/auth/changePassword')}
                px="$6"
                py="$3"
                borderRadius="$md"
              >
                <Text color="$white" fontWeight="$bold">Alterar senha</Text>
              </Button>
            </Box>

            {user.manager && (
              <>
                <Box mt="$6" mb="$2" alignItems="center">
                  <Text fontWeight="$semibold" color="$typography900">Superior Imediato:</Text>
                </Box>

                <Divider />

                <VStack space="$3" mt="$3">
                  <Box>
                    <Text fontWeight="$bold" color="$typography900">Nome:</Text>
                    <Text>{user.manager.name}</Text>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="$bold" color="$typography900">Cargo:</Text>
                    <Text>{user.manager.position}</Text>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="$bold" color="$typography900">E-mail:</Text>
                    <Text>{user.manager.email}</Text>
                  </Box>
                </VStack>
              </>
            )}
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}
