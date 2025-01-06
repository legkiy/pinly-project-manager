import { Button, Stack } from '@mui/material';
import { Text } from '@/shared/ui';
import AddRounded from '@mui/icons-material/AddRounded';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createMockArray, generateId } from '@/shared/lib';
import { Column, Task, TaskStatus } from '../model';
import DnDItem from './DnDItem';
import { useCallback, useState } from 'react';
import ColumnContainer from './ColumnContainer';

const mockTasks = createMockArray<Task>(10, (step, id) => ({
  id,
  name: `Task ${step}`,
  status: TaskStatus.Queue,
  createdAt: new Date(),
}));

const Kanban = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const [activeItem, setActiveItem] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragStart = (event: any) => {
    console.log(event);
  };

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      // const itemId = activeItemId;

      setActiveItem(null);

      if (!over || active.id === over.id) {
        return;
      }

      const index = mockTasks.findIndex((item) => item.id);

      // onChange(active.id, { index })
    },
    [activeItem, mockTasks]
  );

  const createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      createdAt: new Date(),
      name: `new column ${columns.length + 1}`,
    };

    setColumns((prev) => [...prev, newColumn]);
  };

  console.log(columns);

  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        outline: '1px solid black',
        overflowY: 'hidden',
        overflowX: 'scroll',
      }}
    >
      {/* <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => handleDragStart(event)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveItem(null)}
      >
        <SortableContext items={mockTasks.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {mockTasks.map((item) => (
            <DnDItem {...item} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItem
            ? renderItem({
                item: shouldBePresent(items.find((item) => getItemId(item) === activeItem)),
                status: 'overlay',
              })
              <DnDItem />
            : null}
        </DragOverlay>
      </DndContext> */}
      {/* <Column title={<Text mess="kanban.toDo" />} />
      <Column title={<Text mess="kanban.inProgress" />} />
      <Column title={<Text mess="kanban.done" />} /> */}
      {columns.map((column) => (
        <ColumnContainer key={column.id} title={column.name} />
      ))}
      <Button startIcon={<AddRounded />} onClick={createNewColumn}>
        <Text mess="Add" />
      </Button>
    </Stack>
  );
};
export default Kanban;
