import { Box, Drawer, useTheme } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CreateNote, NoteCard, useNotesStore } from '@/entities/Note';
import { useProjectStore } from '@/entities/Project';

interface Props {
  projectId: string;
}

const NotesDrawer = ({ projectId }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const notesIds = useProjectStore((s) => s.projects[projectId].notesIds);

  const notes = useNotesStore((s) => s.notes);
  const moveNote = useNotesStore((s) => s.moveNote);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
      delay: 200,
    },
  });

  const sensors = useSensors(pointerSensor);

  const theme = useTheme();

  const handleClose = () => {
    setOpen(false); // сначала закрыть с анимацией
    setTimeout(() => navigate(-1), theme.transitions.duration.leavingScreen); // потом перейти назад после анимации
  };

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setOpen(true), 10); // следующий tick
    return () => clearTimeout(timeout);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;

    const activeId = active.id as string;
    const containerRect = containerRef.current?.getBoundingClientRect();

    const offsetX = (delta.x / (containerRect?.width || 0)) * 100;
    const offsetY = (delta.y / (containerRect?.height || 0)) * 100;
    moveNote(activeId, {
      offsetX,
      offsetY,
    });
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose} keepMounted={false}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
        <Box p={2} height={['85vh']} sx={{ backgroundColor: 'white' }} ref={containerRef}>
          <CreateNote projectId={projectId} />
          {notesIds?.map((noteId) => (
            <NoteCard {...notes[noteId]} key={noteId} />
          ))}
        </Box>
      </DndContext>
    </Drawer>
  );
};

export default NotesDrawer;
