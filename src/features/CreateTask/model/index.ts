import { z } from 'zod';

export const createSchema = z.object({
  title: z
    .string({
      error: 'errors.required',
    })
    .nonempty('errors.required')
    .min(1, 'errors.required'),
  description: z.string().nonempty('errors.required').min(1, 'errors.required'),
  columnId: z.string().nonempty(),
});

export type CreateTaskDTO = z.infer<typeof createSchema>;
