import { createMockArray } from '@/shared/lib';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { Task, TaskStatus } from '../model';
import { RemoveCircleRounded } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqEntity } from '@/shared/models';

const mockTasks = createMockArray<Task>(50, (step, id) => ({
  id,
  name: `Task ${step}`,
  status: TaskStatus.Queue,
  createdAt: new Date(),
}));

interface Props {
  onDelete: (id: string) => void;
  column: UniqEntity;
}

const ColumnContainer = ({ column, onDelete }: Props) => {
  const { isDragging, attributes, setNodeRef, listeners, transition, transform } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      item: column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Stack
      ref={setNodeRef}
      gap={2}
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
          cursor: 'grab',
          justifyItems: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">{column.name}</Typography>
        <IconButton onClick={() => onDelete(column.id)}>
          <RemoveCircleRounded />
        </IconButton>
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
            p: 1,
          }}
        >
          {mockTasks.map((task) => (
            <Card key={task.id}>
              <Typography variant="subtitle1">{task.name}</Typography>
            </Card>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default ColumnContainer;
