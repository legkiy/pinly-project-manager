import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../model';
import { CreateProjectDTO } from '@/features/CreateProject/model';
import { Task } from '@/entities/Task';
import { Column } from '@/entities/Column';
import { CreateTaskDTO } from '@/features/CreateTask/model';
import { useNotesStore } from '@/entities/Note';

type State = {
  projects: Record<string, Project>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
};

type Actions = {
  createProject: (project: CreateProjectDTO) => Project;
  deleteProject: (projectId: string) => void;
  addNote: (projectId: string, noteId: string) => void;
  //------------- Column CRUD
  createColumn: (projectId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (projectId: string, newOrder: string[]) => void;
  updateColumn: (columnId: string, title: string) => void;
  //------------- Task CRUD
  createTask: (task: CreateTaskDTO) => void;
  moveTask: (taskId: string | string[], toColumnId: string, beforeTaskId?: string) => void;
  sortTasks: (columnId: string, newOrder: string[]) => void;
  deleteTask: (taskId: string) => void;
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
        const projectId = 'project-' + crypto.randomUUID();

        const newProject: Project = {
          ...project,
          id: projectId,
          createdAt: new Date().toISOString(),
          columnsIds: columns.map((el) => el.id),
          notesIds: [],
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
      deleteProject: (projectId: string) => {
        const { projects, columns, tasks } = get();
        const project = projects[projectId];
        if (!project) return;

        const columnIds = project.columnsIds;

        // Собираем все taskIds, которые есть в колонках проекта
        const taskIdsToRemove = columnIds.flatMap((columnId) => columns[columnId]?.taskIds || []);

        // Удаляем колонки
        const updatedColumns = { ...columns };
        columnIds.forEach((id) => {
          delete updatedColumns[id];
        });

        // Удаляем задачи
        const updatedTasks = { ...tasks };
        taskIdsToRemove.forEach((id) => {
          delete updatedTasks[id];
        });

        // Удаляем заметки
        useNotesStore.getState().deleteNote(project.notesIds);
        // Удаляем проект
        const updatedProjects = { ...projects };
        delete updatedProjects[projectId];

        set({
          projects: updatedProjects,
          columns: updatedColumns,
          tasks: updatedTasks,
        });
      },
      addNote: (projectId, noteId) => {
        set((stete) => ({
          ...stete,
          projects: {
            ...stete.projects,
            [projectId]: {
              ...stete.projects[projectId],
              notesIds: [...(stete.projects[projectId].notesIds || []), noteId],
            },
          },
        }));
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
        const { columns, projects, tasks } = get();
        const { [columnId]: column, ...rest } = columns;

        if (!column) return;

        const keysToRemove = new Set(column.taskIds);
        const updateTasks = Object.keys(tasks).reduce<Record<string, Task>>((acc, key) => {
          if (!keysToRemove.has(key)) {
            acc[key] = tasks[key];
          }
          return acc;
        }, {});

        set({
          columns: rest,
          projects: {
            ...projects,
            [column.projectId]: {
              ...projects[column.projectId],
              columnsIds: projects[column.projectId].columnsIds.filter((id) => id !== columnId),
            },
          },
          tasks: updateTasks,
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
      updateColumn: (columnId, title) => {
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          return {
            ...state,
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                title,
              },
            },
          };
        });
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
          const taskIds = Array.isArray(taskId) ? taskId : [taskId];
          const updatedTasks = { ...state.tasks };
          const updatedColumns = { ...state.columns };

          // Проверка: все задачи и колонка должны существовать
          if (!state.columns[toColumnId]) return state;

          // Сначала удалим все задачи из их старых колонок
          taskIds.forEach((id) => {
            const task = updatedTasks[id];
            if (!task || !updatedColumns[task.columnId]) return;

            updatedColumns[task.columnId] = {
              ...updatedColumns[task.columnId],
              taskIds: updatedColumns[task.columnId].taskIds.filter((tId) => tId !== id),
            };
          });

          // Добавим задачи в новую колонку
          updatedColumns[toColumnId] = {
            ...updatedColumns[toColumnId],
            taskIds: [...updatedColumns[toColumnId].taskIds, ...taskIds],
          };

          // Обновим columnId у самих задач
          taskIds.forEach((id) => {
            const task = updatedTasks[id];
            if (!task) return;
            updatedTasks[id] = {
              ...task,
              columnId: toColumnId,
            };
          });

          return {
            ...state,
            columns: updatedColumns,
            tasks: updatedTasks,
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
      deleteTask: (taskId) => {
        const { tasks } = get();
        const { [taskId]: _deletedTask, ...rest } = tasks;

        set((state) => ({
          ...state,
          tasks: rest,
        }));
      },
    }),
    { name: 'projectStore', partialize: ({ projects, columns, tasks }) => ({ projects, columns, tasks }) }
  )
);

export default useProjectStore;
