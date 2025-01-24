import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../model';

type State = {
  projectsList: Project[];
};

type Actions = {
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
};

type Store = State & Actions;

const initState: State = {
  projectsList: [],
};

const projectStore = create<Store>()(
  persist(
    (set) => ({
      ...initState,
      addProject: (project) => {
        set((state) => ({
          projectsList: [...state.projectsList, project],
        }));
      },
      removeProject: (id) => {
        set((state) => ({
          projectsList: state.projectsList.filter((project) => project.id !== id),
        }));
      },
    }),
    { name: 'projectStore', partialize: ({ projectsList }) => ({ projectsList }) }
  )
);

// Перегрузка функции для корректного определения возвращаемого объекта
export function useProjectStore(): Store;
export function useProjectStore(id: string | undefined): { project: Project | undefined } & Store;

export function useProjectStore(id?: string | undefined) {
  const store = projectStore();

  if (id) {
    const project = store.projectsList.find((project) => project.id === id);
    return { project, ...store };
  }

  return store;
}

export default useProjectStore;
