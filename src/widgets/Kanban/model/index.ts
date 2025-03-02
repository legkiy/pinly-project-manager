import { Task } from '@/entities/Task';
import { UniqEntity } from '@/shared/models';

export interface ColumnProps extends UniqEntity {
  tasksList: Task[];
}
