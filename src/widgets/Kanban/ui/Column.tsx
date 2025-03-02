import { Box, Stack, Typography } from '@mui/material';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { ColumnProps } from '../model';
import { TaskCard } from '@/entities/Task';
import DragableItem from './DragableItem';

const Column = ({ tasksList, createdAt, id, name }: ColumnProps) => {
  const { isDragging, attributes, setNodeRef, listeners, transition, transform } = useSortable({
    id,
    data: {
      item: {
        name,
      },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasksIds = useMemo(() => tasksList.map((task) => task.id), [tasksList]);

  return (
    <Stack
      ref={setNodeRef}
      gap={1}
      sx={{
        bgcolor: 'background.paper',
        width: 350,
        minWidth: 350,
        height: '100%',
        ...style,
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <Stack
        {...attributes}
        {...listeners}
        direction="row"
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
          justifyItems: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
        }}
      >
        <Typography variant="h6">{name}</Typography>
      </Stack>
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Stack
          gap={2}
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          <SortableContext items={tasksIds}>
            {tasksList.map((task) => (
              <DragableItem key={task.id} id={task.id}>
                <TaskCard {...task} onDelete={() => {}} />
              </DragableItem>
            ))}
          </SortableContext>
        </Stack>
      </Box>
    </Stack>
  );
};
export default Column;
