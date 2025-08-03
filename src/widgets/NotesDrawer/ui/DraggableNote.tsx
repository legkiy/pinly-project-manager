import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { NoteCard, useNotesStore } from '@/entities/Note';

interface Props {
  noteId: string;
}
const DraggableNote = ({ noteId }: Props) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id: noteId,
  });

  const note = useNotesStore((s) => s.notes[noteId]);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        cursor: active ? 'grabbing' : 'grab',
        userSelect: 'none',
        transform: CSS.Translate.toString(transform),
        position: 'absolute',
        left: `${note.positionPercent.x}%`,
        top: `${note.positionPercent.y}%`,
      }}
      {...listeners}
      {...attributes}
    >
      <NoteCard {...note} />
    </Box>
  );
};

export default memo(DraggableNote);
