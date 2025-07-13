import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../model';
import { CreateProjectDTO } from '@/features/CreateProject/model';

type Column = {
  id: string;
  title: string;
  createdAt: string;
};

type State = {
  projects: Record<string, Project>;
  columns: Record<string, Column>;
};

type Actions = {
  createProject: (project: CreateProjectDTO) => Project;
  deleteProject: (id: string) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
};

type ProjectStore = State & Actions;

const initState: State = {
  projects: {},
  columns: {},
};

const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      ...initState,
      createProject: (project) => {
        const projectId = crypto.randomUUID();

        const newProject = {
          id: projectId,
          ...project,
          createdAt: new Date().toISOString(),
          columnsIds: project.columns.map((el) => el.id),
        };

        set((state) => ({
          ...state,
          projects: {
            ...state.projects,
            [projectId]: newProject,
          },
          columns: {
            ...state.columns,
            ...newProject.columns.reduce<Record<string, Column>>((acc, column) => {
              acc[column.id] = { ...column, createdAt: new Date().toISOString() };
              return acc;
            }, {}),
          },
        }));
        return newProject;
      },
      deleteProject: (id) => {
        set((state) => {
          const newProjects = { ...state.projects };
          delete newProjects[id];
          return { projects: newProjects };
        });
      },
      updateProject: (id, data) => {
        set((state) => ({
          projects: {
            [id]: {
              ...state.projects[id],
              ...data,
            },
            ...state.projects,
          },
        }));
      },
    }),
    { name: 'projectStore', partialize: ({ projects, columns }) => ({ projects, columns }) }
  )
);

// Перегрузка функции для корректного определения возвращаемого объекта
// export function useProjectStore(): ProjectStore;
// export function useProjectStore(id: string | undefined): { project: Project | undefined } & ProjectStore;

// export function useProjectStore(projectId?: string) {
//   const store = projectStore((state) => {
//     if (projectId) {
//       return {
//         ...state,
//         project: state.projectsList[projectId] || undefined,
//       };
//     }
//     return state;
//   });

//   return store;
// }

export default useProjectStore;
