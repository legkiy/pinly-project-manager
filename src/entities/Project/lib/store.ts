import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../model';
import { CreateProjectDTO } from '@/features/CreateProject/model';
import { Task } from '@/entities/Task';
import { Column } from '@/entities/Column';
import { CreateTaskDTO } from '@/features/CreateTask/model';

type State = {
  projects: Record<string, Project>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
};

type Actions = {
  createProject: (project: CreateProjectDTO) => Project;
  //------------- Column CRUD
  createColumn: (projectId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (projectId: string, newOrder: string[]) => void;
  //------------- Task CRUD
  createTask: (task: CreateTaskDTO) => void;
};

type ProjectStore = State & Actions;

const initState: State = {
  projects: {},
  columns: {},
  tasks: {},
};

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      ...initState,
      createProject: ({ columns, ...project }) => {
        const projectId = crypto.randomUUID();

        const newProject: Project = {
          id: projectId,
          ...project,
          createdAt: new Date().toISOString(),
          columnsIds: columns.map((el) => el.id),
        };

        set((state) => ({
          ...state,
          projects: {
            ...state.projects,
            [projectId]: newProject,
          },
          columns: {
            ...state.columns,
            ...columns.reduce<Record<string, Column>>((acc, column) => {
              acc[column.id] = { ...column, createdAt: new Date().toISOString(), projectId, taskIds: [] };
              return acc;
            }, {}),
          },
        }));
        return newProject;
      },
      createColumn: (projectId, title) => {
        const id = 'column-' + crypto.randomUUID();
        const newColumn: Column = {
          id,
          projectId,
          title,
          taskIds: [],
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const updatedProject: Project = {
            ...state.projects[projectId],
            columnsIds: [...state.projects[projectId].columnsIds, id],
          };

          return {
            ...state,
            columns: {
              ...state.columns,
              [id]: newColumn,
            },
            projects: {
              ...state.projects,
              [projectId]: updatedProject,
            },
          };
        });
      },
      deleteColumn: (columnId) => {
        console.log('delete', columnId);

        const { columns, projects } = get();
        const { [columnId]: column, ...rest } = columns;
        if (!column) return;

        set({
          columns: rest,
          projects: {
            ...projects,
            [column.projectId]: {
              ...projects[column.projectId],
              columnsIds: projects[column.projectId].columnsIds.filter((id) => id !== columnId),
            },
          },
          // TODO: добавить удаление задач при удалении столбца
          // tasks: Object.fromEntries(Object.entries(tasks).filter(([, task]) => task.columnId !== columnId)),
        });
      },
      moveColumn: (projectId, newOrder) => {
        set((state) => ({
          projects: {
            ...state.projects,
            [projectId]: {
              ...state.projects[projectId],
              columnsIds: newOrder,
            },
          },
        }));
      },
      createTask: (task) => {},
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
