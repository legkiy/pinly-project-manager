import { UniqEntity } from './common';

export type Project = UniqEntity & {
  description: string;
  image?: string;
};
