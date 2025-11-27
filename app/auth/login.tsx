import { useState } from 'react';
import { Pressable } from 'react-native';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import {
  Box, Button, Center, HStack, Icon, Input, InputField, Text,
} from '@gluestack-ui/themed';
import { useSession } from '@/src/auth/useSession';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import HeaderUniqueIcon from '@/src/components/headers/headerUniqueIcon';
import { useAppToast } from '@/src/hooks/useAppToast';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');


const schema = z.object({
  email: z.string({ required_error: 'Informe o e-mail' }),
  password: z.string({ required_error: 'Informe a senha' }).min(4, 'Senha muito curta'),
});

type Form = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const { login } = useSession();
  const { showToast } = useAppToast();
  const [show, setShow] = useState(false);

  const {
    handleSubmit, setValue, formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      console.log('🚀 Submetendo login...');

      await login({
        email: data.email.trim(),
        password: data.password
      });

      console.log('⏳ Aguardando persistência...');

      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('🔄 Navegando...');
      router.replace('/private');
    } catch (error) {
      console.error('❌ Erro no login:', error);
      showToast({
        type: 'error',
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente',
      });
    }
  };  return (
    <Box flex={1} bg="$white">
      <HeaderUniqueIcon />

      <Box
        bgColor='$white'
        px="$6"
        pt={height * 0.06}
        mt='-$3'
        gap="$4"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        >
        <Box gap="$1">
          <Text fontWeight="$bold">E-mail:</Text>
          <Input w='$80' variant="outline" size="md" borderColor='#141414'>
            <InputField
              placeholder="nome@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(t) => setValue('email', t, { shouldValidate: true })}
              autoCorrect={false}
              returnKeyType="next"
            />
          </Input>
          {errors.email && <Text color="$error600">{errors.email.message}</Text>}
        </Box>

        <Box gap="$1">
          <Text fontWeight="$bold">Senha:</Text>
          <HStack gap='$1' alignItems='center'>
            <Input w='$80' variant="outline" size="md" borderColor='#141414'>
              <InputField
                placeholder="***************"
                secureTextEntry={!show}
                onChangeText={(t) => setValue('password', t, { shouldValidate: true })}
                autoCapitalize="none"
              />
            </Input>
            <Pressable onPress={() => setShow((s) => !s)}>
              <Icon as={show ? EyeOffIcon : EyeIcon} size='md'>
              </Icon>
            </Pressable>
          </HStack>
          <Box alignItems="flex-start">
            <Pressable onPress={() => router.push('/auth/forgotPassword')}>
              <Text size="xs" color="$secondary600">Esqueceu a senha?</Text>
            </Pressable>
          </Box>
          {errors.password && <Text color="$error600">{errors.password.message}</Text>}
        </Box>


        <Center>
          <Button
            bgColor='#0F0F1A'
            w='$24'
            mt="$4"
            isDisabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            >
            <Text fontWeight="$bold" color='$white'>Entrar</Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
