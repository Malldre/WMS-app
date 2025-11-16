import { memo, useCallback, useState } from 'react';
import { Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import {
  Box, HStack, VStack, Text, Icon, Pressable, Button,
} from '@gluestack-ui/themed';
import { ArrowLeft, Info } from 'lucide-react-native';
import HeaderWithSettings from '@/src/components/headers/headerWithSettings';

type SettingKey = 'highContrast' | 'reduceMotion' | 'screenReader';

function SettingItem({
  label,
  icon,
  value,
  onValueChange,
}: {
  label: string;
  icon?: any;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <Box
      bg="$white"
      borderRadius="$lg"
      px="$4"
      py="$3"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 6 }}
      shadowOpacity={0.08}
      shadowRadius={14}
      elevation={6}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="md">
          {icon && <Icon as={icon} size="lg" color="$typography900" />}
          <Text size="md" color="$typography900">{label}</Text>
        </HStack>

        <Switch
          value={value}
          onValueChange={onValueChange}
        />
      </HStack>
    </Box>
  );
}

export default function AccessibilityScreen() {
  const router = useRouter();

  const [fontSize, setFontSize] = useState(1); // 0..1 scale
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
  });

  const toggle = useCallback((key: SettingKey) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const reset = useCallback(() => {
    setFontSize(1);
    setSettings({
      highContrast: false,
      reduceMotion: false,
      screenReader: false,
    });
  }, []);

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

          <Text size='2xl' color='#0F0F1A' fontWeight="$bold">
            Acessibilidade
          </Text>

          <Icon as={Info} size="xl" />
        </HStack>

      </Box>

      <Box
        flex={1}
        p="$4"
      >
        <VStack space="lg" mt="$2" px="$2">
          <Box alignItems="center">
            <Text fontWeight="$bold" color="$typography900" mb="$3">Tamanho da fonte:</Text>

            <HStack alignItems="center" space="$3" w="$full">
              <Text color="$typography900">A</Text>

              <Box flex={1} alignItems="center">
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0.8}
                  maximumValue={1.4}
                  value={fontSize}
                  minimumTrackTintColor="#0F0F1A"
                  maximumTrackTintColor="#E6E6E6"
                  thumbTintColor="#0F0F1A"
                  onValueChange={setFontSize}
                />
              </Box>

              <Text color="$typography900" style={{ fontSize: 18 * fontSize }}>A</Text>
            </HStack>
          </Box>

          <VStack space="md" mt="$2">
            <SettingItem
              label="Modo de Alto Contraste"
              value={settings.highContrast}
              onValueChange={() => toggle('highContrast')}
            />

            <SettingItem
              label="Reduzir Animações"
              value={settings.reduceMotion}
              onValueChange={() => toggle('reduceMotion')}
            />

            <SettingItem
              label="Leitor de tela"
              value={settings.screenReader}
              onValueChange={() => toggle('screenReader')}
            />
          </VStack>

          <Box alignItems="center" mt="$6" mb="$6">
            <Button
              bgColor="#0F0F1A"
              px="$6"
              py="$3"
              borderRadius="$md"
              onPress={reset}
            >
              <Text color="$white" fontWeight="$bold">Redefinir configurações</Text>
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
