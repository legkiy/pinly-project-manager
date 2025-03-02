import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';

interface Props {
  id: string;
  children: React.ReactNode;
  isGrabbing?: boolean;
}

const DragableItem = ({ id, children, isGrabbing }: Props) => {
  const { isDragging, attributes, setNodeRef, listeners, transition, transform } = useSortable({
    id,
    data: {
      item: {},
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        cursor: isGrabbing ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.3 : 1,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export default DragableItem;
