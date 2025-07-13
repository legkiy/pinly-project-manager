import { z } from 'zod';

export const columnSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  id: z.string().nonempty().min(1, 'errors.required'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  description: z.string().optional(),
  columns: z.array(columnSchema).min(1, 'errors.required'),
});

export type CreateProjectDTO = z.infer<typeof projectSchema>;

export const defaultColumns = [
  { title: 'Очередь', id: 'column-' + crypto.randomUUID() },
  { title: 'В процессе', id: 'column-' + crypto.randomUUID() },
  { title: 'Завершено', id: 'column-' + crypto.randomUUID() },
];