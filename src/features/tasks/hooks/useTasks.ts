import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksService } from '../services/tasks.service';
import { TasksFilters } from '@/src/types/tasks';
import { useCallback } from 'react';

export const TASKS_QUERY_KEYS = {
  all: ['tasks'] as const,
  open: () => [...TASKS_QUERY_KEYS.all, 'open'] as const,
  my: () => [...TASKS_QUERY_KEYS.all, 'my'] as const,
  closed: () => [...TASKS_QUERY_KEYS.all, 'closed'] as const,
  detail: (id: number) => [...TASKS_QUERY_KEYS.all, 'detail', id] as const,
};

export function useOpenTasks(filters?: TasksFilters) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEYS.open(), filters],
    queryFn: () => tasksService.getOpenTasks(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
  });
}

export function useMyTasks(filters?: TasksFilters) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEYS.my(), filters],
    queryFn: () => tasksService.getMyTasks(filters),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useClosedTasks(filters?: TasksFilters) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEYS.closed(), filters],
    queryFn: () => tasksService.getClosedTasks(filters),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}export function useTask(id: number) {
  return useQuery({
    queryKey: TASKS_QUERY_KEYS.detail(id),
    queryFn: () => tasksService.getTaskById(id),
    enabled: !!id,
  });
}

export function useInvalidateTasks() {
  const queryClient = useQueryClient();

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS.all });
  }, [queryClient]);

  const invalidateOpen = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS.open() });
  }, [queryClient]);

  const invalidateMy = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS.my() });
  }, [queryClient]);

  const invalidateClosed = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS.closed() });
  }, [queryClient]);

  return {
    invalidateAll,
    invalidateOpen,
    invalidateMy,
    invalidateClosed,
  };
}
