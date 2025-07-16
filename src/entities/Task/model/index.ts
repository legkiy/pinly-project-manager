import { UniqEntity } from '@/shared/models';

export type Task = UniqEntity & {
  columnId: string;
  description?: string;
  createdAt: string;
};
