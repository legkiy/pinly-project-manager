import { useProjectStore } from '@/entities/Project';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import SortableTaskItem from './SortableTaskItem';
import { DndItemType } from '../model';

interface SortableColumnProps {
  id: string;
}

const SortableColumn = ({ id }: SortableColumnProps) => {
  const column = useProjectStore((s) => s.columns[id]);
  const deleteColumn = useProjectStore((s) => s.deleteColumn);

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
      sx={{
        ...style,
        p: 1.4,
        width: 300,
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          alignSelf: 'center',
          cursor: 'grab',
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {column.title}
        <IconButton
          onClick={() => {
            deleteColumn(id);
          }}
          size="small"
        >
          <DeleteRounded fontSize="small" />
        </IconButton>
      </Box>
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
