import { Box, Drawer, useTheme } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CreateNote, useNotesStore } from '@/entities/Note';
import { useProjectStore } from '@/entities/Project';
import DraggableNote from './DraggableNote';

interface Props {
  projectId: string;
}

const NotesDrawer = ({ projectId }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const notesIds = useProjectStore((s) => s.projects[projectId].notesIds);

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
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      keepMounted={false}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      }}
    >
      <Box m={2} height={['85vh']} ref={containerRef}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
          <CreateNote projectId={projectId} />
          {notesIds?.map((noteId) => (
            <DraggableNote key={noteId} noteId={noteId} />
          ))}
        </DndContext>
      </Box>
    </Drawer>
  );
};

export default NotesDrawer;
