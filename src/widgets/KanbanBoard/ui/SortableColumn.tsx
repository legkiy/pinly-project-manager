import { useProjectStore } from '@/entities/Project';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Paper } from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import SortableTaskItem from './SortableTaskItem';
import { DndItemType } from '../model';
import { useDroppable } from '@dnd-kit/core';

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

  const { setNodeRef: droppableRef } = useDroppable({
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
        p: 2,
        pt: 1,
        minWidth: 240,
        maxWidth: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          alignSelf: 'center',
          cursor: 'grab',
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
      <Box ref={droppableRef}>
        <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
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
          <Box minHeight={50}>
            {column.taskIds.map((taskId) => (
              <SortableTaskItem key={taskId} taskId={taskId} />
            ))}
          </Box>
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default SortableColumn;
