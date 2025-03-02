import { Task, TaskCard } from '@/entities/Task';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from './Column';
import { Project } from '@/entities/Project';
import { Divider, Stack } from '@mui/material';
import { Fragment, useState } from 'react';
import GrabbingItem from './GrabbingItem';

interface Props {
  columns?: Project['columns'];
  initTasksList: Task[];
}

const Kanban = ({ columns, initTasksList }: Props) => {
  console.log('initTasksList', initTasksList);
  const [tasksList, setTaskList] = useState<Task[]>(initTasksList);

  const [dragItem, setDragItem] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const dragedItem = tasksList.find((task) => task.id === event.active.id);
    if (dragedItem) {
      setDragItem(dragedItem);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart}>
      <Stack
        direction="row"
        sx={{
          outline: '1px solid grey',
          overflowY: 'hidden',
          overflowX: 'auto',
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        {columns?.map((column, index) => (
          <Fragment key={column.id}>
            <Column {...column} tasksList={tasksList.filter((task) => task.columnId === column.id)} />
            {columns.length - 1 !== index && <Divider orientation="vertical" flexItem />}
          </Fragment>
        ))}
      </Stack>
      <DragOverlay>
        {dragItem && (
          <GrabbingItem>
            <TaskCard {...dragItem} onDelete={() => {}} />
          </GrabbingItem>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Kanban;
