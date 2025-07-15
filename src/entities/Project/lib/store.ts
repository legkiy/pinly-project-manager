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
  moveTask: (taskId: string, toColumnId: string, beforeTaskId?: string) => void;
  sortTasks: (columnId: string, newOrder: string[]) => void;
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
          ...project,
          id: projectId,
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
      //------------- Column CRUD
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
          ...state,
          projects: {
            ...state.projects,
            [projectId]: {
              ...state.projects[projectId],
              columnsIds: newOrder,
            },
          },
        }));
      },
      //------------- Task CRUD
      createTask: (task) => {
        const taskId = 'task-' + crypto.randomUUID();
        const newTask: Task = {
          ...task,
          id: taskId,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          return {
            ...state,
            columns: {
              ...state.columns,
              [task.columnId]: {
                ...state.columns[task.columnId],
                taskIds: [...state.columns[task.columnId].taskIds, taskId],
              },
            },
            tasks: {
              ...state.tasks,
              [taskId]: newTask,
            },
          };
        });
      },
      moveTask: (taskId, toColumnId) => {
        set((state) => {
          const task = state.tasks[taskId];
          const fromColumnId = task.columnId;

          if (!task || !state.columns[toColumnId]) return state;

          // Удаляем из старой колонки
          const updatedFromColumn: Column = {
            ...state.columns[fromColumnId],
            taskIds: state.columns[fromColumnId].taskIds.filter((id) => id !== taskId),
          };

          // Добавляем в новую колонку
          const newTaskIds = [...state.columns[toColumnId].taskIds, taskId];

          return {
            ...state,
            columns: {
              ...state.columns,
              [fromColumnId]: updatedFromColumn,
              [toColumnId]: {
                ...state.columns[toColumnId],
                taskIds: newTaskIds,
              },
            },
            tasks: {
              ...state.tasks,
              [taskId]: {
                ...task,
                columnId: toColumnId,
              },
            },
          };
        });
      },
      sortTasks: (columnId, newOrder) => {
        set((state) => ({
          ...state,
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: newOrder,
            },
          },
        }));
      },
    }),
    { name: 'projectStore', partialize: ({ projects, columns, tasks }) => ({ projects, columns, tasks }) }
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
