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

const useProjectStore = create<Store>()(
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

export default useProjectStore;
