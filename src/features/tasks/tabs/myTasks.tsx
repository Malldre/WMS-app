import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, Text, Spinner } from '@gluestack-ui/themed';
import CardTasks from '@/src/components/cards';
import FilterByStatusAndName from '@/src/components/filters/filterByStatusAndName';
import { useMyTasks } from '../hooks/useTasks';
import { TasksFilters } from '@/src/types/tasks';

export default function MyTasks() {
  const [filters, setFilters] = useState<TasksFilters>({});
  const { data: tasks, isLoading, isError, refetch } = useMyTasks(filters);

  const handleFilterChange = (newFilters: TasksFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py="$8">
        <Spinner size="large" color='#0F0F1A' />
        <Text mt="$2">Carregando suas tarefas...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py="$8">
        <Text color="$error600">Erro ao carregar suas tarefas</Text>
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <Box px="$2" py="$2">
        <FilterByStatusAndName onFilterChange={handleFilterChange} />
      </Box>
      <FlatList
        data={Array.isArray(tasks) ? tasks : []}
        renderItem={({ item }) => <CardTasks item={item} />}
        keyExtractor={(item, index) => item?.id?.toString() || `task-${index}`}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <Box h={12} />}
        ListEmptyComponent={
          <Box py="$8" alignItems="center">
            <Text color="$coolGray600">Você não tem tarefas atribuídas</Text>
          </Box>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
      />
    </Box>
  );
}
