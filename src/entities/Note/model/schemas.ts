import z from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  descriptions: z.string().optional(),
  projectId: z.string(),
});

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;
