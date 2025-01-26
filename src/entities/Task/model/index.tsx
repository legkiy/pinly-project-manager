import { UniqEntity } from '@/shared/models';

export type Task = UniqEntity & {
  description?: string;
  columnId: string;
  projectId: string;
};
