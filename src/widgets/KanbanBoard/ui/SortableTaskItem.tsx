import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Paper, Stack } from '@mui/material';
import { useProjectStore } from '@/entities/Project';
import { DndItemType } from '../model';

interface SortableTaskItemProps {
  taskId: string;
}

const SortableTaskItem = ({ taskId }: SortableTaskItemProps) => {
  const task = useProjectStore((s) => s.tasks[taskId]);

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
    <Paper
      ref={active?.data.current?.type === DndItemType.Column ? null : setNodeRef}
      {...attributes}
      {...listeners}
      sx={{ p: 1, mb: 1, cursor: 'grab', ...style }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          {task.title}
          {task.description && <div>{task.description}</div>}
        </Box>
      </Stack>
    </Paper>
  );
};

export default SortableTaskItem;
