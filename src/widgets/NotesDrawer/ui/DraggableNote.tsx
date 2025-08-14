import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { NoteCard, useNotesStore } from '@/entities/Note';
import { Icon } from '@/shared/ui';

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
        userSelect: 'none',
        transform: CSS.Translate.toString(transform),
        position: 'absolute',
        left: `${note.positionPercent.x}%`,
        top: `${note.positionPercent.y}%`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Icon
          iconName="pin"
          sx={{
            cursor: active ? 'grabbing' : 'grab',
            position: 'absolute',
            top: active ? -80 : -60,
            left: '50%',
            height: 80,
            transform: 'translate(-50%,0)',
            transition: 'top 0.2s',
          }}
          {...listeners}
          {...attributes}
        />
        <NoteCard {...note} />
      </Box>
    </Box>
  );
};

export default memo(DraggableNote);
