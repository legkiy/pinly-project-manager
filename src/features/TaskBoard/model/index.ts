import { UniqEntity } from '@/shared/models';

export const enum DnDItemType {
  Task = 'task',
  Column = 'column',
}

export type Column = UniqEntity & {
  countOfTasks?: number;
};
