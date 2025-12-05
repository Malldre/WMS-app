import { useEffect, useState, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, Text, Spinner } from '@gluestack-ui/themed';
import CardTasks from '@/src/components/cards';
import FilterByStatusAndName from '@/src/components/filters/filterByStatusAndName';
import { useOpenTasks } from '../hooks/useTasks';
import { TasksFilters } from '@/src/types/tasks';

export default function OpenTasks() {
  const [filters, setFilters] = useState<TasksFilters>({});
  const { data: tasks, isLoading, isError, refetch } = useOpenTasks({ taskType: filters.taskType });

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (!filters.search) return tasks;

    const searchLower = filters.search.toLowerCase();
    return tasks.filter(task =>
      task.description?.toLowerCase().includes(searchLower)
    );
  }, [tasks, filters.search]);

  const handleFilterChange = (newFilters: TasksFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    refetch();
  }, [filters.taskType, refetch]);

  return (
    <Box flex={1}>
      <Box px="$2" py="$2">
        <FilterByStatusAndName onFilterChange={handleFilterChange} />
      </Box>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center" py="$8">
          <Spinner size="large" color='#0F0F1A' />
          <Text mt="$2">Carregando tarefas...</Text>
        </Box>
      ) : isError ? (
        <Box flex={1} justifyContent="center" alignItems="center" py="$8">
          <Text color="$error600">Erro ao carregar tarefas</Text>
        </Box>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => <CardTasks item={item} />}
          keyExtractor={(item, index) => item?.id?.toString() || `task-${index}`}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          ItemSeparatorComponent={() => <Box h={12} />}
          ListEmptyComponent={
            <Box py="$8" alignItems="center">
              <Text color="$coolGray600">Nenhuma tarefa aberta encontrada</Text>
            </Box>
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
          }
        />
      )}
    </Box>
  );
}
