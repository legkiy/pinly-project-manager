import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, IconButton, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { DnDItemType, Task } from '../model';
import { DropdownMenu } from '@/shared/ui';
import { memo } from 'react';

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
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      elevation={1}
      sx={{
        cursor: 'grab',
        opacity: isDragging ? 0.3 : 1,
        ...style,
      }}
    >
      <CardHeader
        title={task.name}
        action={
          <DropdownMenu
            renderBtn={(onOpen) => (
              <IconButton onClick={onOpen}>
                <MoreVert />
              </IconButton>
            )}
          >
            {(onClose) => (
              <>
                <MenuItem
                  onClick={() => {
                    onClose();
                    onDelete(task.id);
                  }}
                >
                  <DeleteRounded />
                </MenuItem>
              </>
            )}
          </DropdownMenu>
        }
      />
      <CardContent>{task.description}</CardContent>
    </Card>
  );
};
export default memo(TaskDnDCard);
