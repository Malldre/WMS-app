import { apiService } from '@/src/services/api.service';
import { Task, TasksFilters } from '@/src/types/tasks';

export const tasksService = {
  async getOpenTasks(filters?: TasksFilters): Promise<Task[]> {
    const { data } = await apiService.get<Task[]>('/tasks/open', {
      params: {
        status: filters?.status?.join(','),
        search: filters?.search,
      },
    });
    return data;
  },

  async getMyTasks(filters?: TasksFilters): Promise<Task[]> {
    const { data } = await apiService.get<Task[]>('/tasks/my-tasks', {
      params: {
        status: filters?.status?.join(','),
        search: filters?.search,
      },
    });
    return data;
  },

  async getClosedTasks(filters?: TasksFilters): Promise<Task[]> {
    const { data } = await apiService.get<Task[]>('/tasks/closed', {
      params: {
        search: filters?.search,
      },
    });
    return data;
  },

  async getTaskById(id: number): Promise<Task> {
    const { data } = await apiService.get<Task>(`/tasks/${id}`);
    return data;
  },

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const { data } = await apiService.patch<Task>(`/tasks/${id}`, updates);
    return data;
  },

  async linkProductToTask(taskId: number, productCode: string): Promise<void> {
    await apiService.post(`/tasks/${taskId}/link`, { productCode });
  },

  async assignToUser(uuid: string, userId: string): Promise<Task> {
    const { data } = await apiService.put<Task>(`/tasks/${uuid}/assign`, { userId });
    return data;
  },

  async completeConference(
    taskId: string,
    conferenceData: {
      quantity: string;
      code: string;
      photoUri?: string;
    }
  ): Promise<Task> {
    const { data } = await apiService.post<Task>(`/tasks/${taskId}/complete-conference`, conferenceData);
    return data;
  },
};
