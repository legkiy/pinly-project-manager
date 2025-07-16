import { routerService } from '@/shared/lib';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  startPage: string;
};

type Actions = {
  setStartPage: (path: string) => void;
};

type Store = State & Actions;

const initState: State = {
  startPage: routerService.projects.root,
};

export const useStartPageSetter = create<Store>()(
  persist(
    (set) => ({
      ...initState,
      setStartPage: (startPage) => set({ startPage }),
    }),
    {
      name: 'startPageSetter',
      partialize: ({ startPage }) => ({ startPage }),
    }
  )
);
