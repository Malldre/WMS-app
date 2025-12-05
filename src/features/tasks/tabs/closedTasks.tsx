import { useState, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, Text, Spinner } from '@gluestack-ui/themed';
import CardTasks from '@/src/components/cards';
import FilterByStatusAndName from '@/src/components/filters/filterByStatusAndName';
import ClosedTaskModal from '@/src/components/closedTaskModal';
import { useClosedTasks } from '../hooks/useTasks';
import { Task, TasksFilters } from '@/src/types/tasks';

export default function ClosedTasks() {
  const [filters, setFilters] = useState<TasksFilters>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks, isLoading, isError, refetch } = useClosedTasks({});

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

  const handleCardPress = (task: Task) => {
    task.invoiceId = Number('1ab81338-567a-4af8-aee4-59b02a22abf9'); // Temporarily hardcoded
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box flex={1}>
      <Box px="$2" py="$2">
        <FilterByStatusAndName isEnded onFilterChange={handleFilterChange} />
      </Box>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center" py="$8">
          <Spinner size="large" color='#0F0F1A' />
          <Text mt="$2">Carregando tarefas encerradas...</Text>
        </Box>
      ) : isError ? (
        <Box flex={1} justifyContent="center" alignItems="center" py="$8">
          <Text color="$error600">Erro ao carregar tarefas encerradas</Text>
        </Box>
      ) : (
        <>
          <FlatList
            data={filteredTasks}
            renderItem={({ item }) => (
              <CardTasks
                item={item}
                onPress={() => handleCardPress(item)}
              />
            )}
            keyExtractor={(item, index) => item?.id?.toString() || `task-${index}`}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
            ItemSeparatorComponent={() => <Box h={12} />}
            ListEmptyComponent={
              <Box py="$8" alignItems="center">
                <Text color="$coolGray600">Nenhuma tarefa encerrada encontrada</Text>
              </Box>
            }
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
            }
          />

          <ClosedTaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            task={selectedTask}
          />
        </>
      )}
    </Box>
  );
}
