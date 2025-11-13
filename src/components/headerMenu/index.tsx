import React from 'react';
import { Pressable, Modal as RNModal, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { VStack, HStack, Divider, Text, Box, Icon } from '@gluestack-ui/themed';
import { User, Accessibility, Info, HelpCircle, LogOut, X } from 'lucide-react-native';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
};

const items: MenuItem[] = [
  { id: 'profile', label: 'Perfil',          icon: User,          onPress: () => router.push('/private/profile') },
  { id: 'a11y',    label: 'Acessibilidade',  icon: Accessibility,  onPress: () => router.push('/private/accessibility') },
  { id: 'about',   label: 'Sobre',           icon: Info,           onPress: () => router.push('/private/about') },
  { id: 'help',    label: 'Ajuda',           icon: HelpCircle,     onPress: () => router.push('/private/help') },
  { id: 'logout',  label: 'Sair',            icon: LogOut,         onPress: () => router.replace('/auth/login') },
];

export default function HeaderMenu({
  isOpen,
  onOpenChange,
  employeeName,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName?: string;
}) {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Box flex={1}>
        <Pressable
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={() => onOpenChange(false)}
          accessibilityRole="button"
          accessibilityLabel="Fechar menu"
        />

        <Box flex={1} justifyContent="center" alignItems="center" px="$4">
          <Box
            w="$full"
            maxWidth="$72"
            borderRadius="$2xl"
            px="$3"
            py="$2"
            bg="$white"
            // Sombra iOS
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 16 }}
            shadowOpacity={0.2}
            shadowRadius={24}
            // Elevação Android
            elevation={12}
          >
            <Pressable
              onPress={() => onOpenChange(false)}
              style={{ alignSelf: 'flex-end', padding: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <Icon as={X} size="sm" />
            </Pressable>

            <VStack space="sm">
              <Box>
                <Text size="sm" color="$secondary600">Funcionário:</Text>
                <Text fontWeight="$semibold">{employeeName ?? '—'}</Text>
              </Box>
              <Divider />
              <VStack space="xs">
                {items.map(({ id, label, icon: Ico, onPress }, idx) => (
                  <Box key={id}>
                    <Pressable
                      onPress={() => {
                        onOpenChange(false);
                        onPress();
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={label}
                    >
                      <HStack alignItems="center" space="md" py="$2" px="$1">
                        <Icon as={Ico} size="xl" color="$typography900" />
                        <Text size="md">{label}</Text>
                      </HStack>
                    </Pressable>
                    {idx < items.length - 1 && <Divider />}
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </RNModal>
  );
}
