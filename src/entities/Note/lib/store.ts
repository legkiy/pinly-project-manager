import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateNoteDTO, Note } from '../model';
import { useProjectStore } from '@/entities/Project';

type State = {
  notes: Record<string, Note>;
};

type Actions = {
  createNote: (note: CreateNoteDTO) => Note;
  moveNote: (noteId: string, posOffset: { offsetX: number; offsetY: number }) => void;
  deleteNote: (noteId: string | string[]) => void;
};

type Store = State & Actions;

const initState: State = {
  notes: {},
};

const useNotesStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initState,
      createNote: (noteDto) => {
        const id = 'note-' + crypto.randomUUID();

        const newNote: Note = {
          ...noteDto,
          id,
          createdAt: new Date().toISOString(),
          positionPercent: {
            x: 0,
            y: 0,
          },
        };

        set((state) => ({
          notes: {
            ...state.notes,
            [id]: newNote,
          },
        }));

        useProjectStore
          .getState()
          .updateProject(noteDto.projectId, ({ notesIds }) => ({ notesIds: [...(notesIds || []), id] }));

        return newNote;
      },
      moveNote: (noteId, newPosition) => {
        const notes = get().notes;
        const targetNote = notes[noteId];
        const newX = Math.min(Math.max(targetNote.positionPercent.x + newPosition.offsetX, 0), 100);
        const newY = Math.min(Math.max(targetNote.positionPercent.y + newPosition.offsetY, 0), 100);

        set({
          notes: {
            ...notes,
            [noteId]: {
              ...targetNote,
              positionPercent: {
                x: newX,
                y: newY,
              },
            },
          },
        });
      },
      deleteNote: (noteId) => {
        const noteIds = Array.isArray(noteId) ? noteId : [noteId];
        const notes = get().notes;
        const remainingNotes = Object.fromEntries(Object.entries(notes).filter(([key]) => !noteIds.includes(key)));

        set({ notes: remainingNotes });
        // Удаляем так же из объекта  проект id 
        const updatedProjectIds = Array.from(new Set(noteIds.map((el) => notes[el].projectId)));
        updatedProjectIds.forEach((prjectId) => {
          useProjectStore
            .getState()
            .updateProject(prjectId, ({ notesIds }) => ({ notesIds: notesIds.filter((el) => el !== noteId) }));
        });
      },
    }),
    { name: 'notesStore', partialize: ({ notes }) => ({ notes }) }
  )
);

export default useNotesStore;
