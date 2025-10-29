import React from 'react';
import { User, Accessibility, Info, HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { Popover, PopoverBackdrop, PopoverContent, PopoverArrow, PopoverCloseButton, VStack, PopoverHeader, Divider, PopoverBody, HStack, PopoverFooter, Text, Box, Icon } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
};

const items: MenuItem[] = [
  { id: 'profile', label: 'Perfil', icon: User, onPress: () => router.push('/private/profile') },
  { id: 'a11y', label: 'Acessibilidade', icon: Accessibility, onPress: () => router.push('/private/accessibility') },
  { id: 'about', label: 'Sobre', icon: Info, onPress: () => router.push('/private/about') },
  { id: 'help', label: 'Ajuda', icon: HelpCircle, onPress: () => router.push('/private/help') },
  { id: 'logout', label: 'Sair', icon: LogOut, onPress: () => router.replace('/auth/login') },
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
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom left"
      offset={8}
      trapFocus
    >
      <PopoverBackdrop />
      <PopoverContent
        maxWidth="$72"
        borderRadius="$xl"
        px="$3"
        py="$2"
        bg="$background0"
        $dark-bg="$background950"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.2}
        shadowRadius={16}
        elevation={10}
      >
        <PopoverArrow />
        <PopoverCloseButton accessibilityLabel="Fechar menu" />
        <VStack space="sm">
          <PopoverHeader>
            <Text size="sm" color="$secondary600">Funcionário:</Text>
            <Text fontWeight="$semibold">{employeeName ?? '—'}</Text>
          </PopoverHeader>

          <Divider />

          <PopoverBody>
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
          </PopoverBody>

          <PopoverFooter />
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
