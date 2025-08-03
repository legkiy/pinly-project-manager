import { z } from 'zod';

const columnSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  id: z.string().nonempty().min(1, 'errors.required'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  description: z.string().optional(),
  columns: z.array(columnSchema).min(1, 'errors.required'),
});

export type CreateProjectDTO = z.infer<typeof projectSchema>;
