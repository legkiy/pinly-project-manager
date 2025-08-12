import { Drawer, Stack, useTheme } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CreateNote, useNotesStore } from '@/entities/Note';
import { useProjectStore } from '@/entities/Project';
import DraggableNote from './DraggableNote';
import TrashContainer from './TraashContainer';

interface Props {
  projectId: string;
}

const NotesDrawer = ({ projectId }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const notesIds = useProjectStore((s) => s.projects[projectId].notesIds);

  const moveNote = useNotesStore((s) => s.moveNote);
  const deleteNote = useNotesStore((s) => s.deleteNote);

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
    const { delta, active, over } = event;

    const activeId = active.id as string;

    // TODO: Добавить модалку которая будет спрашивать об удалении
    if (over?.id === 'trash') {
      return deleteNote(activeId);
    }

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
            maxWidth: '100vw',
            overflowX: 'clip',
          },
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          p: 2,
          height: '85vh',
          maxWidth: '100vw',
          overflowX: 'clip',
        }}
      >
        <CreateNote projectId={projectId} />
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
          <Stack
            ref={containerRef}
            height={['100%']}
            sx={{
              position: 'relative',
            }}
          >
            {notesIds?.map((noteId) => (
              <DraggableNote key={noteId} noteId={noteId} />
            ))}
            <TrashContainer />
          </Stack>
        </DndContext>
      </Stack>
    </Drawer>
  );
};

export default NotesDrawer;
