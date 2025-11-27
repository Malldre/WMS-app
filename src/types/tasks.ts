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
  status?: TaskStatusEnum[];
};

export const TaskStatusColor: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.IN_PROGRESS]: '$yellow500',
  [TaskStatusEnum.COMPLETED]: '$green500',
  [TaskStatusEnum.PENDING]: '$orange500',

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
