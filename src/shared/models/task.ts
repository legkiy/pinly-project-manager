import { UniqEntity } from './common';

export const enum TaskStatus {
  Queue = 'queue',
  InProgress = 'in_progress',
  Done = 'done',
}

export type Task = UniqEntity & {
  description?: string;
  status: TaskStatus;
  columnId: string;
};
