import { UniqEntity } from '@/shared/models';

export type Project = UniqEntity & {
  description?: string;
  columnsIds: string[];
  notesIds: string[];
};

export { projectSchema } from './schemas';
export type { CreateProjectDTO } from './schemas';
