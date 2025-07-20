import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Paper, Stack } from '@mui/material';
import { COLUMN_WIDTH, DndItemType } from '../../model';
import { useProjectStore } from '@/entities/Project';
import SortableTaskItem from '../SortableTaskItem';
import ColumnTitle from './ColumnTitle';

interface SortableColumnProps {
  id: string;
  isActive?: boolean;
}

const SortableColumn = ({ id, isActive }: SortableColumnProps) => {
  const column = useProjectStore((s) => s.columns[id]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: DndItemType.Column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={2}
      sx={{
        ...style,
        p: 1.4,
        width: COLUMN_WIDTH,
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          alignSelf: 'center',
          cursor: isActive ? 'grabbing' : 'grab',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: `translate(-50%, 0)`,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 4,
            borderRadius: 2,
            bgcolor: 'divider',
            mx: 6,
            my: 1,
          }}
        />
      </div>
      <ColumnTitle title={column.title} columnId={id} />
      <Stack
        gap={1}
        sx={{
          mt: column.taskIds.length > 0 ? 1 : 0,
        }}
      >
        <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
          {column.taskIds.map((taskId) => (
            <SortableTaskItem key={taskId} taskId={taskId} />
          ))}
        </SortableContext>
      </Stack>
    </Paper>
  );
};

export default SortableColumn;
