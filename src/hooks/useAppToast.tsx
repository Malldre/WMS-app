import { useToast, Toast, ToastTitle, VStack, Text } from '@gluestack-ui/themed';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ShowToastParams = {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
};

const toastConfig: Record<ToastType, { bg: string; action: string }> = {
  success: { bg: '$success600', action: 'success' },
  error: { bg: '$error600', action: 'error' },
  warning: { bg: '$warning600', action: 'warning' },
  info: { bg: '$info600', action: 'info' },
};

export function useAppToast() {
  const toast = useToast();

  const showToast = ({ title, description, type = 'info', duration = 3000 }: ShowToastParams) => {
    const config = toastConfig[type];

    toast.show({
      placement: 'top',
      duration,
      render: ({ id }) => (
        <Toast nativeID={id} action={config.action} variant="solid" bg={config.bg} mt="$16">
          <VStack space="xs">
            <ToastTitle color="$white">{title}</ToastTitle>
            {description && (
              <Text color="$white" size="sm">
                {description}
              </Text>
            )}
          </VStack>
        </Toast>
      ),
    });
  };

  return { showToast };
}
