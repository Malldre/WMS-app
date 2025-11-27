import { Modal as RNModal } from 'react-native';
import { Box, Text, VStack, HStack, Button } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';

export default function BindModal({
  visible,
  title = 'Confirmar',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: {
  visible: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onPress={onCancel}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <VStack width={320}>
            <Box
              bg='#0F0F1A'
              borderTopLeftRadius={12}
              borderTopRightRadius={12}
              p="$4"
            >
              <Text fontSize={16} fontWeight="$bold" color="$white" textAlign="center">{title}</Text>
            </Box>
            <Box
              bg='$white'
              borderBottomLeftRadius={12}
              borderBottomRightRadius={12}
              p="$5"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 8 }}
              shadowOpacity={0.3}
              shadowRadius={16}
              elevation={12}
            >
              <VStack space="lg">
                {message ? (
                  <Text textAlign="center" fontSize={14} color="#333">
                    {message}
                  </Text>
                ) : null}

                <HStack space="md" justifyContent="center">
                  <Button
                    bgColor="#0F0F1A"
                    borderRadius={8}
                    px="$6"
                    py="$3"
                    onPress={onConfirm}
                  >
                    <Text color="$white" fontWeight="$bold" fontSize={14}>{confirmText}</Text>
                  </Button>

                  <Button
                    bgColor="$white"
                    borderColor="#0F0F1A"
                    borderWidth={1}
                    borderRadius={8}
                    px="$6"
                    py="$3"
                    onPress={onCancel}
                  >
                    <Text color="#0F0F1A" fontWeight="$bold" fontSize={14}>{cancelText}</Text>
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
