import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@mui/material';
import { Task } from '../model';

interface Props extends Task {}

const DnDItem = ({ id, name, description, status }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  return (
    <Card {...attributes} ref={setNodeRef} style={style} {...listeners}>
      {name}
    </Card>
  );
};
export default DnDItem;
