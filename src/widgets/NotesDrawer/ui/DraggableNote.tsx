import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { NoteCard, useNotesStore } from '@/entities/Note';
import { Icon } from '@/shared/ui';
import { useProjectStore } from '@/entities/Project';

interface Props {
  noteId: string;
  projectId: string;
}
const DraggableNote = ({ noteId, projectId }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: noteId,
  });

  const note = useNotesStore((s) => s.notes[noteId]);

  // для защиты когда нужная заметка не существует
  const updateProject = useProjectStore((s) => s.updateProject);

  useLayoutEffect(() => {
    if (!note) {
      updateProject(projectId, ({ notesIds }) => ({ notesIds: notesIds.filter((el) => el !== noteId) }));
    }
  }, []);

  // ref для хранения актуального note
  const noteRef = useRef(note);

  const deleteNote = useNotesStore((s) => s.deleteNote);

  // обновляем ref при каждом изменении note
  useEffect(() => {
    noteRef.current = note;
  }, [note]);

  useEffect(() => {
    return () => {
      const latestNote = noteRef.current;
      if (!latestNote?.title || latestNote.title.trim().length < 1) {
        deleteNote(noteId);
      }
    };
  }, [noteId]);

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
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'absolute',
            top: isDragging ? -80 : -60,
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
