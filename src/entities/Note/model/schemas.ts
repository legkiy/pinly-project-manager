import z from 'zod';

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, 'errors.required'),
  descriptions: z.string().trim().optional(),
  projectId: z.string(),
});

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;
const a = {
  state: {
    projects: {
      '6eed5896-4246-4728-87d6-9149b5024107': {
        title: 'asd',
        description: 'asd',
        id: '6eed5896-4246-4728-87d6-9149b5024107',
        createdAt: '2025-07-31T07:05:06.717Z',
        columnsIds: [
          'column-af8d0b20-7927-4944-a9a6-cfcfe363964d',
          'column-8203ebd5-aa99-43b4-a118-db98c9688e21',
          'column-e7b8370e-aea9-4f15-be1e-2821bdf9d713',
        ],
        notesIds: ['note-0d9654e1-fb83-40a9-9b4e-ad10faa0f746'],
      },
    },
    columns: {
      'column-af8d0b20-7927-4944-a9a6-cfcfe363964d': {
        title: 'Queue',
        id: 'column-af8d0b20-7927-4944-a9a6-cfcfe363964d',
        createdAt: '2025-07-31T07:05:06.717Z',
        projectId: '6eed5896-4246-4728-87d6-9149b5024107',
        taskIds: [],
      },
      'column-8203ebd5-aa99-43b4-a118-db98c9688e21': {
        title: 'In Progress',
        id: 'column-8203ebd5-aa99-43b4-a118-db98c9688e21',
        createdAt: '2025-07-31T07:05:06.717Z',
        projectId: '6eed5896-4246-4728-87d6-9149b5024107',
        taskIds: [],
      },
      'column-e7b8370e-aea9-4f15-be1e-2821bdf9d713': {
        id: 'column-e7b8370e-aea9-4f15-be1e-2821bdf9d713',
        projectId: '6eed5896-4246-4728-87d6-9149b5024107',
        title: 'gotovo',
        taskIds: [],
        createdAt: '2025-08-15T11:22:48.735Z',
      },
    },
    tasks: {},
  },
  version: 0,
};
