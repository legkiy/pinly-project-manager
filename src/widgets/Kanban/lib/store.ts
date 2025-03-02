import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

interface KanbanState {
  boards: Board[];
  activeBoardId: string | null;
  moveTask: (taskId: string, targetColumnId: string) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  boards: JSON.parse(localStorage.getItem('kanbanBoards') || '[]'),
  activeBoardId: null,
  moveTask: (taskId, targetColumnId) =>
    set((state) => {
      const updatedBoards = state.boards.map((board) => {
        if (board.id !== state.activeBoardId) return board;

        const sourceColumn = board.columns.find((col) => col.tasks.some((task) => task.id === taskId));
        const targetColumn = board.columns.find((col) => col.id === targetColumnId);
        if (!sourceColumn || !targetColumn) return board;

        const task = sourceColumn.tasks.find((t) => t.id === taskId);
        if (!task) return board;

        sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
        targetColumn.tasks.push(task);

        return { ...board, columns: [...board.columns] };
      });

      localStorage.setItem('kanbanBoards', JSON.stringify(updatedBoards));

      return { boards: updatedBoards };
    }),
}));
