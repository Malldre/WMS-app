import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import {
  Box, Text, Input, InputField, HStack, Icon, Button, Center,
} from '@gluestack-ui/themed';
import { Eye, EyeOff } from 'lucide-react-native';
import HeaderUniqueIcon from '@/src/components/headers/headerUniqueIcon';
import { Dimensions } from 'react-native';
import { passwordService } from '@/src/auth/services/password.service';
import { useAppToast } from '@/src/hooks/useAppToast';
const { height } = Dimensions.get('window');

const schema = z.object({
  currentPassword: z.string().min(4, 'Senha muito curta'),
  password: z.string().min(4, 'Senha muito curta'),
  confirm: z.string().min(4, 'Confirme a senha'),
}).refine((data) => data.password === data.confirm, {
  path: ['confirm'],
  message: 'Senhas não conferem',
});

type Form = z.infer<typeof schema>;

export default function ChangePassword() {
  const router = useRouter();
  const { showToast } = useAppToast();
  const [isSend, setSend] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    handleSubmit, setValue, formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { currentPassword: '', password: '', confirm: '' } });

  const onSubmit = async (data: Form) => {
    try {
      await passwordService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.password,
        confirmPassword: data.confirm,
      });

      showToast({
        type: 'success',
        title: 'Senha alterada',
        description: 'Sua senha foi alterada com sucesso',
      });

      setSend(true);
      setTimeout(() => router.replace('/auth/login'), 2000);
    } catch (error: any) {
      console.error('❌ Erro ao alterar senha:', error);
      showToast({
        type: 'error',
        title: 'Erro ao alterar senha',
        description: error.message || 'Verifique sua senha atual e tente novamente',
      });
    }
  };

  if (isSend) {
    return (
      <Box flex={1} bg="$white">
        <HeaderUniqueIcon />
        <Center flex={1} px="$6">
          <Text fontWeight="$bold" mb="$3">Senha alterada com sucesso</Text>
          <Text color="$secondary600" mb="$6">Você será redirecionado para o login</Text>
          <Button onPress={() => router.replace('/auth/login')} isDisabled={isSubmitting}>
            <Text color="$white">Ir para login</Text>
          </Button>
        </Center>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white">
      <HeaderUniqueIcon />

      <Box
        bgColor='$white'
        p="$8"
        pt={height * 0.06}
        mt='-$3'
        gap="$4"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
      >
        <Box mt="$2">
          <Text fontWeight="$bold" mb="$2">Senha atual</Text>

          <HStack alignItems="center" gap="$2">
            <Input w="$80" variant="outline" size="md" borderColor='#141414'>
              <InputField
                placeholder="Digite sua senha atual"
                secureTextEntry={!showCurrentPwd}
                onChangeText={(t) => setValue('currentPassword', t, { shouldValidate: true })}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Input>

            <Pressable onPress={() => setShowCurrentPwd((s) => !s)} accessibilityLabel={showCurrentPwd ? "Ocultar senha" : "Mostrar senha"}>
              <Icon as={showCurrentPwd ? EyeOff : Eye} />
            </Pressable>
          </HStack>

          {errors.currentPassword && <Text color="$danger600" mt="$2">{errors.currentPassword.message}</Text>}
        </Box>

        <Box>
          <Text fontWeight="$bold" mb="$2">Nova senha</Text>

          <HStack alignItems="center" gap="$2">
            <Input w="$80" variant="outline" size="md" borderColor='#141414'>
              <InputField
                placeholder="Digite a nova senha"
                secureTextEntry={!showPwd}
                onChangeText={(t) => setValue('password', t, { shouldValidate: true })}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Input>

            <Pressable onPress={() => setShowPwd((s) => !s)} accessibilityLabel={showPwd ? "Ocultar senha" : "Mostrar senha"}>
              <Icon as={showPwd ? EyeOff : Eye} />
            </Pressable>
          </HStack>

          {errors.password && <Text color="$danger600" mt="$2">{errors.password.message}</Text>}
        </Box>

        <Box>
          <Text fontWeight="$bold" mb="$2">Confirmar senha</Text>

          <HStack alignItems="center" gap="$2">
            <Input w="$80" variant="outline" size="md" borderColor='#141414'>
              <InputField
                placeholder="Repita a nova senha"
                secureTextEntry={!showConfirm}
                onChangeText={(t) => setValue('confirm', t, { shouldValidate: true })}
                autoCapitalize="none"
                returnKeyType="done"
              />
            </Input>

            <Pressable onPress={() => setShowConfirm((s) => !s)} accessibilityLabel={showConfirm ? "Ocultar confirmação" : "Mostrar confirmação"}>
              <Icon as={showConfirm ? EyeOff : Eye} />
            </Pressable>
          </HStack>

          {errors.confirm && <Text color="$danger600" mt="$2">{errors.confirm.message}</Text>}
        </Box>

        <Center>
          <Button
            bgColor='#0F0F1A'
            w='$48'
            mt="$4"
            isDisabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            <Text color="$white" fontWeight="$bold">Alterar senha</Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
