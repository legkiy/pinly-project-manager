import { create } from 'zustand';
import { Column } from '../model';
import { generateId } from '@/shared/lib';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task } from '@/entities/Task';

type State = {
  columns: Column[];
  tasks: Task[];
};

type Actions = {
  createColumn: () => void;
  deleteColumn: (id: string) => void;
  moveColumn: (activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => void;
};

type Store = State & Actions;

const initState: State = {
  columns: [],
  tasks: [],
};

const useTaskBoard = create<Store>((set, get) => ({
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
  deleteColumn: (id) => {
    const newTasks = get().tasks.filter((task) => task.columnId !== id);
    const filtredColumns = get().columns.filter((column) => column.id !== id);

    set({ columns: filtredColumns, tasks: newTasks });
  },
  moveColumn: (activeColumnId, overColumnId) => {
    const columns = get().columns;
    const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId);
    const overColumnIndex = columns.findIndex((column) => column.id === overColumnId);

    set({ columns: arrayMove(columns, activeColumnIndex, overColumnIndex) });
  },
}));

export default useTaskBoard;
