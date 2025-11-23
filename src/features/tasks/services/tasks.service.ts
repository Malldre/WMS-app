import { apiService } from '@/src/services/api.service';
import { CardTasksStatusEnum } from '@/src/types/tasks';

export type Task = {
  id: number;
  status: CardTasksStatusEnum;
  nota: string;
  descricao: string;
  especi: string;
  dataEntrada?: string;
  horaEntrada?: string;
  expedidaPor?: string;
  prazoConclusao?: string;
};

export type GetTasksParams = {
  status?: CardTasksStatusEnum[];
  search?: string;
  type?: 'open' | 'mine' | 'closed';
};

export type GetTasksResponse = {
  tasks: Task[];
  total: number;
};

export async function getTasks(params?: GetTasksParams): Promise<GetTasksResponse> {
  const { data } = await apiService.get<GetTasksResponse>('/tasks', {
    params: {
      status: params?.status?.join(','),
      search: params?.search,
      type: params?.type,
    },
  });

  return data;
}

export async function getTaskById(id: number): Promise<Task> {
  const { data } = await apiService.get<Task>(`/tasks/${id}`);
  return data;
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const { data } = await apiService.post<Task>('/tasks', task);
  return data;
}

export async function updateTask(id: number, task: Partial<Task>): Promise<Task> {
  const { data } = await apiService.put<Task>(`/tasks/${id}`, task);
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await apiService.delete(`/tasks/${id}`);
}

export async function linkTask(taskId: number, productCode: string): Promise<void> {
  await apiService.post(`/tasks/${taskId}/link`, { productCode });
}
