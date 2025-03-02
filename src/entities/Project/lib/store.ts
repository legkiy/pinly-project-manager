import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../model';
import { UniqueIdentifier } from '@dnd-kit/core';

type State = {
  projectsList: Project[];
};

type Actions = {
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  moveProjectColumn: (id: string, activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => void;
};

type Store = State & Actions;

const initState: State = {
  projectsList: [],
};

const projectStore = create<Store>()(
  persist(
    (set) => ({
      ...initState,
      moveProjectColumn: (id, activeColumnId, overColumnId) => {
        console.log('moveProjectColumn', id, activeColumnId, overColumnId);

        // const projectsList = get().projectsList;
        // const project = projectsList.find((project) => project.id === id);
        // if (!project) return;

        // const columns = project?.columns ?? [];
        // const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId);
        // const overColumnIndex = columns.findIndex((column) => column.id === overColumnId);

        // const newProjectList = projectsList.map((project) => {
        //   if (project.id === id) {
        //     return { ...project, columns: arrayMove(columns, activeColumnIndex, overColumnIndex) };
        //   }
        //   return project;
        // });

        // set({ projectsList: newProjectList });
      },
      addProject: (project) => {
        set((state) => ({
          projectsList: [project, ...state.projectsList],
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
