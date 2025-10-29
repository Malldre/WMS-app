import { CheckBoxComponent } from '@/src/components/checkbox';
import { CardTasksStatusEnum } from '@/src/types/tasks';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useState, useMemo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initial: CardTasksStatusEnum[];
  onApply: (next: CardTasksStatusEnum[]) => void;
  onClear: () => void;
};

const ALL = [
  CardTasksStatusEnum.conferencia,
  CardTasksStatusEnum.armazenamento,
  CardTasksStatusEnum.estoque,
  CardTasksStatusEnum.separacao,
  CardTasksStatusEnum.desmobilizacao,
];

const leftChecboxs: Array<{ value: string, label: string }> = [
  { value: CardTasksStatusEnum.conferencia, label: 'Conferência' },
  { value: CardTasksStatusEnum.armazenamento, label: 'Armazenamento' },
  { value: CardTasksStatusEnum.desmobilizacao, label: 'Desmobilização' }
]

const rightChecboxs: Array<{ value: string, label: string }> = [
  { value: CardTasksStatusEnum.separacao, label: 'Separação' },
  { value: CardTasksStatusEnum.desmobilizacao, label: 'Desmobilização' },
]

export function FiltersSheet({ isOpen, onClose, initial, onApply, onClear }: Props) {
  const [local, setLocal] = useState<CardTasksStatusEnum[]>(initial);

  const sync = useMemo(() => initial.join('|'), [initial]);
  useMemo(() => setLocal(initial), [sync]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[40]}>
      <ActionsheetBackdrop />
      <ActionsheetContent gap='$1.5' p="$4" borderTopLeftRadius="$2xl" borderTopRightRadius="$2xl">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Text mb="$3" size="md" fontWeight="$bold">
          Filtros de busca
        </Text>

        <HStack space="md" mb="$4">
          <VStack flex={1} space="sm">
            <CheckboxGroup
              value={local}
              onChange={(v) => setLocal(v as CardTasksStatusEnum[])}
            >
              {leftChecboxs.map((c) =>
                <CheckBoxComponent
                  value={c.value}
                  label={c.label}
                />
              )}
            </CheckboxGroup>
          </VStack>

          <VStack flex={1} space="sm">
            <CheckboxGroup
              value={local}
              onChange={(v) => setLocal(v as CardTasksStatusEnum[])}
            >
              {rightChecboxs.map((c) =>
                <CheckBoxComponent
                  value={c.value}
                  label={c.label}
                />
              )}
            </CheckboxGroup>
          </VStack>
        </HStack>

        <HStack space="md">
          <Button
            flex={1}
            bg="$primary900"
            onPress={() => {
              onApply(local);
              onClose();
            }}
          >
            <Text color="$white" fontWeight="$bold">Aplicar filtros</Text>
          </Button>

          <Button
            flex={1}
            variant="outline"
            borderColor="$outline300"
            onPress={() => {
              setLocal([]);
              onClear();
              onClose();
            }}
          >
            <Text fontWeight="$bold">Limpar filtros</Text>
          </Button>
        </HStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
