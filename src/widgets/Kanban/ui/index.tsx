import { Task } from '@/entities/Task';
import { createMockArray } from '@/shared/lib';
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Column from './Column';
import { Project } from '@/entities/Project';
import { Divider, Stack } from '@mui/material';
import { Fragment } from 'react';

const moockTask = createMockArray<Task>(5, (step, id) => ({
  name: `Task ${step}`,
  description: `Description ${step}`,
  id,
  columnId: '1',
  projectId: '1',
  createdAt: new Date(),
}));

interface Props {
  columns?: Project['columns'];
}

const Kanban = ({ columns }: Props) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
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
            <Column {...column} tasksList={moockTask} />
            {columns.length - 1 !== index && <Divider orientation="vertical" flexItem />}
          </Fragment>
        ))}
      </Stack>
      <DragOverlay></DragOverlay>
    </DndContext>
  );
};
export default Kanban;
