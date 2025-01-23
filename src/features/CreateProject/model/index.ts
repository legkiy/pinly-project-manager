import { z } from 'zod';

export interface CreateProjectDTO {
  name: string;
  description: string;
}

export const createSchema = z.object({
  name: z.string().min(4, 'errors.required'),
  description: z.string().optional(),
  columns:z.array(z.object({
    
  }))
});
