import { TabKey } from '../hooks/useActiveTabs';
import ClosedTasks from './closedTasks';
import MyTasks from './myTasks';
import OpenTasks from './openTasks';

export const TAB_COMPONENTS: Record<TabKey, React.ComponentType> = {
  open: OpenTasks,
  mine: MyTasks,
  closed: ClosedTasks,
};

export const TABS_META: { key: TabKey; label: string }[] = [
  { key: 'open',   label: 'Em aberto' },
  { key: 'mine',   label: 'Suas tarefas' },
  { key: 'closed', label: 'Encerradas' },
];
