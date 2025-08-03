import { useDraggable } from '@dnd-kit/core';
import { Card } from '@mui/material';
import { memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Note } from '../../model';

interface Props extends Note {}

const NoteCard = ({ title, descriptions, positionPercent, id }: Props) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id,
  });

  return (
    <Card
      ref={setNodeRef}
      sx={{
        cursor: active ? 'grabbing' : 'grab',
        userSelect: 'none',
        transform: CSS.Translate.toString(transform),
        position: 'absolute',
        left: `${positionPercent.x}%`,
        top: `${positionPercent.y}%`,
      }}
      {...listeners}
      {...attributes}
    >
      {title}
      {descriptions}
    </Card>
  );
};

export default memo(NoteCard);
