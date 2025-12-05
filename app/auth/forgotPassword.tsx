import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import {
  Box, Button, Center, HStack, Input, InputField, Text,
} from '@gluestack-ui/themed';
import HeaderUniqueIcon from '@/src/components/headers/headerUniqueIcon';
import { useState } from 'react';
import { passwordService } from '@/src/auth/services/password.service';
import { useAppToast } from '@/src/hooks/useAppToast';

const schema = z.object({
  email: z.string({ required_error: 'Informe o e-mail' }).email('E-mail inválido'),
});

type Form = z.infer<typeof schema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { showToast } = useAppToast();
  const [isSend, setSend] = useState(false);

  const {
    handleSubmit, setValue, formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await passwordService.requestPasswordReset(data.email.trim());

      showToast({
        type: 'success',
        title: 'E-mail enviado',
        description: 'Verifique sua caixa de entrada',
      });

      setSend(true);
    } catch (error: any) {
      showToast({
        type: 'error',
        title: 'Erro ao enviar e-mail',
        description: error.message || 'Tente novamente mais tarde',
      });
    }
  };

  return (
    <Box flex={1} bg="$white">
      <HeaderUniqueIcon />

      <Box
        bgColor='$white'
        px="$6"
        pt="$8"
        mt='-$3'
        gap="$4"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        >
          {!isSend ?
            (
              <>
                <Text size='lg' color='$primary900' fontWeight='$bold'>
                  Insira seu e-mail abaixo para envio do reset de senha
                </Text>

                <Box gap="$1">
                  <Text fontWeight="$bold">E-mail:</Text>
                  <Input w='$72' variant="outline" size="md" borderColor='#141414'>
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

                <HStack gap='$2' alignItems='center' justifyContent='center'>
                  <Button
                    bgColor='#0F0F1A'
                    w='$24'
                    mt="$4"
                    isDisabled={isSubmitting}
                    onPress={() => router.back()}
                    >
                    <Text fontWeight="$bold" color='$white'>Voltar</Text>
                  </Button>
                  <Button
                    bgColor='#0F0F1A'
                    w='$24'
                    mt="$4"
                    isDisabled={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                    >
                    <Text fontWeight="$bold" color='$white'>Enviar</Text>
                  </Button>
                </HStack>
              </>
            ) : (
              <>
                <Text size='lg' color='$primary900' fontWeight='$bold'>
                  E-mail enviado com sucesso!
                </Text>
                <Text size='lg' color='$primary900'>
                  Um e-mail de alteração de senha foi enviado, verifique sua caixa de entrada.
                </Text>
                <Center>
                  <Button
                    bgColor='#0F0F1A'
                    w='$24'
                    mt="$4"
                    isDisabled={isSubmitting}
                    onPress={() => router.back()}
                    >
                    <Text fontWeight="$bold" color='$white'>Voltar</Text>
                  </Button>
                </Center>
              </>
            )
          }
      </Box>
    </Box>
  );
}
