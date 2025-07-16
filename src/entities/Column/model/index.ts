import { UniqEntity } from '@/shared/models';

export type Column = UniqEntity & {
  projectId: string;
  taskIds: string[];
};
