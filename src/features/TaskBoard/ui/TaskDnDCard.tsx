import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { DnDItemType } from '../model';
import { memo } from 'react';
import { TaskCard, Task } from '@/entities/Task';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskDnDCard = ({ task, onDelete }: Props) => {
  const { isDragging, attributes, setNodeRef, listeners, transition, transform } = useSortable({
    id: task.id,
    data: {
      type: DnDItemType.Task,
      item: task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'grab',
        opacity: isDragging ? 0.3 : 1,
        ...style,
      }}
    >
      <TaskCard {...task} onDelete={onDelete} />
    </Box>
  );
};
export default memo(TaskDnDCard);
