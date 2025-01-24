import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../model';

type State = {
  tasksList: Task[];
};

type Actions = {
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
};

type Store = State & Actions;

const initState: State = {
  tasksList: [],
};

const taskStore = create<Store>()(
  persist(
    (set) => ({
      ...initState,
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
