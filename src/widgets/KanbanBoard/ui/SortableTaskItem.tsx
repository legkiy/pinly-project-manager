import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { useProjectStore } from '@/entities/Project';
import { DndItemType } from '../model';
import { TaskCard } from '@/entities/Task';

interface SortableTaskItemProps {
  taskId: string;
}

const SortableTaskItem = ({ taskId }: SortableTaskItemProps) => {
  const task = useProjectStore((s) => s.tasks[taskId]);
  const deleteTask = useProjectStore((s) => s.deleteTask);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, active } = useSortable({
    id: taskId,
    data: {
      type: DndItemType.Task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={active?.data.current?.type === DndItemType.Column ? null : setNodeRef}
      {...attributes}
      {...listeners}
      sx={{ cursor: 'grab', ...style }}
    >
      <TaskCard {...task} onDelete={deleteTask} />
    </Box>
  );
};

export default SortableTaskItem;
