import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode } from '../model';

interface ThemeState {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: ThemeMode.System,
      setThemeMode: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: 'themeMod',
    }
  )
);

export default useThemeStore;
