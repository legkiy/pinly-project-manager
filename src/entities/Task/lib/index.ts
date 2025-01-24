import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../model';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

type State = {
  tasksList: Task[];
};

type Actions = {
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  moveTask: (activeId: UniqueIdentifier, overId: UniqueIdentifier, columnId?: UniqueIdentifier) => void;
};

type Store = State & Actions;

const initState: State = {
  tasksList: [],
};

const taskStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initState,
      moveTask: (activeId, overId, columnId) => {
        const taskList = get().tasksList;
        const activeIndex = taskList.findIndex((task) => task.id === activeId);
        const overIndex = taskList.findIndex((task) => task.id === overId);
        if (columnId) {
          taskList[activeIndex].columnId = columnId as string;
        } else {
          taskList[activeIndex].columnId = taskList[overIndex].columnId;
        }

        const newTaskList = arrayMove(taskList, activeIndex, overIndex);
        set({ tasksList: newTaskList });
      },
      addTask: (task) => {
        set((state) => ({
          tasksList: [...state.tasksList, task],
        }));
      },
      removeTask: (id) => {
        set((state) => ({
          tasksList: state.tasksList.filter((task) => task.id !== id),
        }));
      },
    }),
    { name: 'taskStore', partialize: ({ tasksList }) => ({ tasksList }) }
  )
);

// Перегрузка функции для корректного определения возвращаемого объекта
export function useTaskStore(): Store;
export function useTaskStore(id: string | undefined): { task: Task | undefined } & Store;

export function useTaskStore(id?: string | undefined) {
  const store = taskStore();

  if (id) {
    const task = store.tasksList.find((task) => task.id === id);
    return { task, ...store };
  }

  return store;
}

export default useTaskStore;
