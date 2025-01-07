import { Button, Divider, Stack } from '@mui/material';
import { Text } from '@/shared/ui';
import AddRounded from '@mui/icons-material/AddRounded';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Task } from '../model';
import { Fragment, useMemo, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { SortableContext } from '@dnd-kit/sortable';
import { UniqEntity } from '@/shared/models';
import { createPortal } from 'react-dom';
import { useTaskBoard } from '../lib';

const TaskBoard = () => {
  const { createColumn, deleteColumn, moveColumn, columns } = useTaskBoard();

  const columnsIds = useMemo(() => columns.map((column) => column.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<UniqEntity | null>(null);

  const [activeItem, setActiveItem] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.1,
    },
  });
  const sensors = useSensors(pointerSensor);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data?.current?.type === 'column') {
      setActiveColumn(event.active.data?.current?.item);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    moveColumn(activeColumnId, overColumnId);

    setActiveColumn(null);
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
      <Stack
        direction="row"
        gap={1}
        sx={{
          outline: '1px solid grey',
          overflowY: 'hidden',
          overflowX: 'auto',
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <SortableContext items={columnsIds}>
          {columns.map((column, index) => (
            <Fragment key={column.id}>
              <ColumnContainer column={column} onDelete={deleteColumn} />
              {columns.length - 1 !== index && <Divider orientation="vertical" flexItem />}
            </Fragment>
          ))}
        </SortableContext>
        <Button
          startIcon={<AddRounded />}
          onClick={createColumn}
          sx={{
            minWidth: 100,
          }}
        >
          <Text mess="Add" />
        </Button>
      </Stack>
      {createPortal(
        <DragOverlay>{activeColumn && <ColumnContainer column={activeColumn} onDelete={deleteColumn} />}</DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
export default TaskBoard;
