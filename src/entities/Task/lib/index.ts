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

const useTaskStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initState,
      moveTask: (activeId, overId, columnId) => {
        const taskList = get().tasksList;

        const activeIndex = taskList.findIndex((task) => task.id === activeId);

        const updatedTaskList = [...taskList];
        const overIndex = taskList.findIndex((task) => task.id === overId);

        if (!columnId) {
          updatedTaskList[activeIndex] = {
            ...updatedTaskList[activeIndex],
            columnId: updatedTaskList[overIndex].columnId,
          };

          set({ tasksList: arrayMove(updatedTaskList, activeIndex, overIndex) });
        } else {
          updatedTaskList[activeIndex] = {
            ...updatedTaskList[activeIndex],
            columnId: columnId as string,
          };

          set({ tasksList: arrayMove(updatedTaskList, activeIndex, overIndex) });
        }
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

export default useTaskStore;
