export enum TaskTypeEnum {
  CONFERENCE = 'CONFERENCE',
  DEMOBILIZATION = 'DEMOBILIZATION',
  STORAGE = 'STORAGE',
  SEPARATION = 'SEPARATION',
  STOCK = 'STOCK',
  INVENTORY = 'INVENTORY',
  PENDING = 'PENDING',
  PICKING = 'PICKING',
}

export enum TaskStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export type Task = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  taskType: TaskTypeEnum;
  status: TaskStatusEnum;
  invoiceId: number;
  materialId: number | null;
  itemSpecification: string;
  assignedUserId: number;
  issuedBy: string;
  entryDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
};

export type TasksFilters = {
  search?: string;
  taskType?: TaskTypeEnum[];
};

export const TaskStatusColor: Record<TaskTypeEnum, string> = {
  [TaskTypeEnum.CONFERENCE]: '$blue600',
  [TaskTypeEnum.DEMOBILIZATION]: '$orange600',
  [TaskTypeEnum.STORAGE]: '$green600',
  [TaskTypeEnum.SEPARATION]: '$purple600',
  [TaskTypeEnum.STOCK]: '$teal600',
  [TaskTypeEnum.PENDING]: '$yellow600',
  [TaskTypeEnum.INVENTORY]: '$gray600',
  [TaskTypeEnum.PICKING]: '$pink600',
};

export const TaskTypeTranslate: Record<TaskTypeEnum, string> = {
  [TaskTypeEnum.CONFERENCE]: 'Conferência',
  [TaskTypeEnum.DEMOBILIZATION]: 'Desmobilização',
  [TaskTypeEnum.STORAGE]: 'Estoque',
  [TaskTypeEnum.SEPARATION]: 'Separação',
  [TaskTypeEnum.STOCK]: 'Estoque',
  [TaskStatusEnum.PENDING]: 'Pendente',
  [TaskTypeEnum.INVENTORY]: 'Inventário',
  [TaskTypeEnum.PICKING]: 'Escolhendo',
};

export const TaskStatusTranslate: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.IN_PROGRESS]: 'Em Progresso',
  [TaskStatusEnum.COMPLETED]: 'Concluída',
  [TaskStatusEnum.PENDING]: 'Pendente',
};
