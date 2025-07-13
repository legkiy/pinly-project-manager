import { useProjectStore } from '@/entities/Project';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Paper } from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';

interface SortableColumnProps {
  id: string;
}

const SortableColumn = ({ id }: SortableColumnProps) => {
  const column = useProjectStore((s) => s.columns[id]);
  const deleteColumn = useProjectStore((s) => s.deleteColumn);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        minWidth: 240,
        maxWidth: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
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
      {/* сюда будут добавлены задачи позже */}
    </Paper>
  );
};

export default SortableColumn;
