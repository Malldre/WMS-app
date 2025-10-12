export enum CardTasksStatusEnum {
  conferencia = 'Conferência',
  armazenamento = 'Armazenamento',
  estoque = 'Estoque',
  separacao = 'Separação',
  desmobilizacao = 'Desmobilização'
}

export const CardTasksColor: Record<any, string> = {
  [CardTasksStatusEnum.conferencia]: '$green500',
  [CardTasksStatusEnum.armazenamento]: '$blue500',
  [CardTasksStatusEnum.estoque]: '$orange500',
  [CardTasksStatusEnum.separacao]: '$yellow500',
  [CardTasksStatusEnum.desmobilizacao]: '$red500',
};

export const CardTasksTranslate: Record<any, string> = {
  [CardTasksStatusEnum.conferencia]: 'Conferência',
  [CardTasksStatusEnum.armazenamento]: 'Armazenamento',
  [CardTasksStatusEnum.estoque]: 'Estoque',
  [CardTasksStatusEnum.separacao]: 'Separação',
  [CardTasksStatusEnum.desmobilizacao]: 'Desmobilização',
};
