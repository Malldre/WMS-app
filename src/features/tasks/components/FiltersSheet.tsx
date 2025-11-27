import { useState, useMemo } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  CheckboxGroup,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { CheckBoxComponent } from '@/src/components/checkbox';
import {TaskTypeEnum, TaskTypeTranslate } from '@/src/types/tasks';

type FiltersSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  initial: TaskTypeEnum[];
  onApply: (selected: TaskTypeEnum[]) => void;
  onClear: () => void;
};

const ALL = [
  TaskTypeEnum.CONFERENCE,
  TaskTypeEnum.DEMOBILIZATION,
  TaskTypeEnum.STORAGE,
  TaskTypeEnum.SEPARATION,
  TaskTypeEnum.STOCK,
];

const STATUS_OPTIONS = [
  { value: TaskTypeEnum.CONFERENCE, label: TaskTypeTranslate[TaskTypeEnum.CONFERENCE] },
  { value: TaskTypeEnum.DEMOBILIZATION, label: TaskTypeTranslate[TaskTypeEnum.DEMOBILIZATION] },
  { value: TaskTypeEnum.STORAGE, label: TaskTypeTranslate[TaskTypeEnum.STORAGE] },
];

const rightChecboxs: Array<{ value: string, label: string }> = [
  { value: TaskTypeEnum.SEPARATION, label: TaskTypeTranslate[TaskTypeEnum.SEPARATION] },
  { value: TaskTypeEnum.DEMOBILIZATION, label: TaskTypeTranslate[TaskTypeEnum.DEMOBILIZATION] },
]

export function FiltersSheet({
  isOpen,
  onClose,
  initial,
  onApply,
  onClear
}: FiltersSheetProps) {
  const [localSelection, setLocalSelection] = useState<TaskTypeEnum[]>(initial);

  const initialSync = useMemo(() => initial.join('|'), [initial]);
  useMemo(() => setLocalSelection(initial), [initialSync]);

  const handleApply = () => {
    onApply(localSelection);
    onClose();
  };

  const handleClear = () => {
    setLocalSelection([]);
    onClear();
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[30]}>
      <ActionsheetBackdrop />
      <ActionsheetContent
        gap="$1.5"
        p="$4"
        borderTopLeftRadius="$2xl"
        borderTopRightRadius="$2xl"
      >
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Text mb="$3" size="md" fontWeight="$bold">
          Filtros de busca
        </Text>

        <HStack space="md" mb="$4">
          <VStack flex={1} space="sm">
            <CheckboxGroup
            value={localSelection}
            onChange={(values) => setLocalSelection(values as TaskTypeEnum[])}
            >
            {STATUS_OPTIONS.map((option) => (
                <CheckBoxComponent
                key={option.value}
                value={option.value}
                label={option.label}
                />
            ))}
            </CheckboxGroup>
          </VStack>

          <VStack flex={1} space="sm">
            <CheckboxGroup
              value={localSelection}
              onChange={(values) => setLocalSelection(values as TaskTypeEnum[])}
              gap='$1'
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
            onPress={handleApply}
          >
            <Text color="$white" fontWeight="$bold">
              Aplicar filtros
            </Text>
          </Button>

          <Button
            flex={1}
            variant="outline"
            borderColor="$outline300"
            onPress={handleClear}
          >
            <Text fontWeight="$bold">
              Limpar filtros
            </Text>
          </Button>
        </HStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
