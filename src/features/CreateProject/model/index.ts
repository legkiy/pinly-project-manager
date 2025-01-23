import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().nonempty('errors.required'),
  description: z.string().optional(),
  columns: z.array(
    z.object({
      name: z.string().nonempty('errors.required'),
    })
  ),
});

export type CreateProjectDTO = z.infer<typeof createSchema>;
