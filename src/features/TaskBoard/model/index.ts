import { UniqEntity } from '@/shared/models';

export const enum TaskStatus {
  Queue = 'queue',
  InProgress = 'in_progress',
  Done = 'done',
}

export const enum DnDItemType {
  Task = 'task',
  Column = 'column',
}

export type Task = UniqEntity & {
  description?: string;
  status: TaskStatus;
  columnId: string;
};

export type Column = UniqEntity & {
  countOfTasks?: number;
};
