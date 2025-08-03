import { UniqEntity } from '@/shared/models';

export type Note = UniqEntity & {
  descriptions?: string;
  projectId: string;
  positionPercent: {
    x: number;
    y: number;
  };
};
