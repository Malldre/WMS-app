import { useState, useCallback } from 'react';
import { Pressable } from 'react-native';
import { HStack, Input, InputField, InputSlot } from '@gluestack-ui/themed';
import { Funnel, Search } from 'lucide-react-native';
import { FiltersSheet } from '@/src/features/tasks/components/FiltersSheet';
import { TaskTypeEnum, TasksFilters } from '@/src/types/tasks';

type FilterByTaskTypeAndNameProps = {
  isEnded?: boolean;
  onFilterChange?: (filters: TasksFilters) => void;
};

export default function FilterByTaskTypeAndName({
  isEnded = false,
  onFilterChange,
}: FilterByTaskTypeAndNameProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskTypeEnum[]>([]);
  const [searchText, setSearchText] = useState('');

  const handleApplyFilters = useCallback((taskType: TaskTypeEnum[]) => {
    setSelectedTaskType(taskType);
    onFilterChange?.({
      taskType: taskType.length > 0 ? taskType : undefined,
      search: searchText || undefined,
    });
  }, [searchText, onFilterChange]);

  const handleClearFilters = useCallback(() => {
    setSelectedTaskType([]);
    onFilterChange?.({
      search: searchText || undefined,
    });
  }, [searchText, onFilterChange]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);

    const timer = setTimeout(() => {
      onFilterChange?.({
        taskType: selectedTaskType.length > 0 ? selectedTaskType : undefined,
        search: text || undefined,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedTaskType, onFilterChange]);

  return (
    <HStack w="$full" alignItems="center" justifyContent="space-between">
      <Input
        w={isEnded ? '$full' : '$64'}
        variant="rounded"
        size="md"
        bg="$white"
        borderWidth={1}
        borderColor="$primary900"
      >
        <InputField
          color="$primary900"
          placeholder="Buscar..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
        <InputSlot pr="$3">
          <Search size="18px" color="#0F0F1A" strokeWidth="3px" />
        </InputSlot>
      </Input>

      {!isEnded && (
        <Pressable onPress={() => setFiltersOpen(true)}>
          <Funnel size="32px" color="#0F0F1A" />
        </Pressable>
      )}

      <FiltersSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initial={selectedTaskType}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </HStack>
  );
}
