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
import { generateId } from '@/shared/lib';
import { Column, Task } from '../model';
import { Fragment, useMemo, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { UniqEntity } from '@/shared/models';
import { createPortal } from 'react-dom';

const Kanban = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsIds = useMemo(() => columns.map((column) => column.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<UniqEntity | null>(null);

  const [activeItem, setActiveItem] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.1,
    },
  });
  const sensors = useSensors(pointerSensor);

  const createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      createdAt: new Date(),
      name: `new column ${columns.length + 1}`,
    };

    setColumns((prev) => [...prev, newColumn]);
  };

  const handleOnDeleteColumn = (id: string) => {
    const filtredColumns = columns.filter((column) => column.id !== id);
    setColumns(filtredColumns);
  };

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
    setColumns((prev) => {
      const activeColumnIndex = prev.findIndex((column) => column.id === activeColumnId);
      const overColumnIndex = prev.findIndex((column) => column.id === overColumnId);

      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });

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
              <ColumnContainer column={column} onDelete={handleOnDeleteColumn} />
              {columns.length - 1 !== index && <Divider orientation="vertical" flexItem />}
            </Fragment>
          ))}
        </SortableContext>
        <Button
          startIcon={<AddRounded />}
          onClick={createNewColumn}
          sx={{
            minWidth: 100,
          }}
        >
          <Text mess="Add" />
        </Button>
      </Stack>
      {createPortal(
        <DragOverlay>
          {activeColumn && <ColumnContainer column={activeColumn} onDelete={handleOnDeleteColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
export default Kanban;
