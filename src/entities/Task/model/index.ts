import { UniqEntity } from '@/shared/models';

export type Task = UniqEntity & {
  columnId: string;
  description?: string;
  createdAt: string;
};

export { createSchema } from './schemas';
export type { CreateTaskDTO } from './schemas';
