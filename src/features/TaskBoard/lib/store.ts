import { create } from 'zustand';
import { Column } from '../model';
import { generateId } from '@/shared/lib';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

type State = {
  columns: Column[];
};

type Actions = {
  createColumn: () => void;
  deleteColumn: (id: string) => void;
  moveColumn: (activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => void;
};

type Store = State & Actions;

const initState: State = {
  columns: [],
};

const useTaskBoard = create<Store>((set) => ({
  ...initState,
  createColumn: () => {
    set((prev) => {
      const newColumn: Column = {
        id: generateId(),
        createdAt: new Date(),
        name: `new column ${prev.columns.length + 1}`,
      };
      return {
        columns: [...prev.columns, newColumn],
      };
    });
  },
  deleteColumn: (id) =>
    set((prev) => {
      const filtredColumns = prev.columns.filter((column) => column.id !== id);
      console.log('filtredColumns', filtredColumns);

      return { columns: filtredColumns };
    }),
  moveColumn: (activeColumnId, overColumnId) =>
    set((prev) => {
      const activeColumnIndex = prev.columns.findIndex((column) => column.id === activeColumnId);
      const overColumnIndex = prev.columns.findIndex((column) => column.id === overColumnId);

      return { columns: arrayMove(prev.columns, activeColumnIndex, overColumnIndex) };
    }),
}));

export default useTaskBoard;
