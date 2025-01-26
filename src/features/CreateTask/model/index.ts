import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().nonempty('errors.required'),
  description: z.string().optional(),
  projectId: z.string().nonempty(),
  columnId: z.string().nonempty(),
});

export type CreateTaskDTO = z.infer<typeof createSchema>;
