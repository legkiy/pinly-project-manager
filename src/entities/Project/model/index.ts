import { UniqEntity } from '@/shared/models';

export type Project = UniqEntity & {
  description?: string;
  columnsIds: string[];
  notesIds:string[]
};
