import z from 'zod';

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, 'errors.required'),
  descriptions: z.string().trim().optional(),
  projectId: z.string(),
});

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;
