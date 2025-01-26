import { Divider, Stack } from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DnDItemType } from '../model';
import { Fragment, useCallback, useMemo, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { SortableContext } from '@dnd-kit/sortable';
import { UniqEntity } from '@/shared/models';
import { createPortal } from 'react-dom';
import { checkDragItemType, useTaskBoard } from '../lib';
import TaskDnDCard from './TaskDnDCard';
import { Task, useTaskStore } from '@/entities/Task';
import { useProjectStore } from '@/entities/Project';

interface Props {
  columns: UniqEntity[];
  projectId: string;
}

const TaskBoard = ({ columns, projectId }: Props) => {
  const { deleteColumn } = useTaskBoard();

  const { tasksList, moveTask, removeTask } = useTaskStore();
  const { moveProjectColumn } = useProjectStore();

  const columnsIds = useMemo(() => columns.map((column) => column.id) ?? [''], [columns]);

  const [activeColumn, setActiveColumn] = useState<UniqEntity | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const tasksByColumn = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.id] = tasksList.filter((task) => task.columnId === column.id);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [columns, tasksList]);

  const onDragStart = ({ active }: DragStartEvent) => {
    if (checkDragItemType(active, DnDItemType.Column)) {
      setActiveColumn(active.data?.current?.item);
      return;
    }
    if (checkDragItemType(active, DnDItemType.Task)) {
      setActiveTask(active.data?.current?.item);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    if (checkDragItemType(active, DnDItemType.Task)) {
      if (checkDragItemType(over, DnDItemType.Task)) {
        moveTask(active.id, over.id);
      } else {
        moveTask(active.id, over.id, over.id);
      }
    }

    if (checkDragItemType(active, DnDItemType.Column)) {
      moveProjectColumn(projectId ?? '', active.id, over.id);
    }
  };

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !checkDragItemType(active, DnDItemType.Task)) return;

    // // Task over another Task
    // if (checkDragItemType(over, DnDItemType.Task)) {
    //   moveTask(active.id, over.id);
    // }
    // Task over column
    if (checkDragItemType(over, DnDItemType.Column)) {
      moveTask(active.id, active.id, over.id);
    }
  }, []);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
      delay: 1,
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
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
        <SortableContext items={columnsIds}>
          {columns.map((column, index) => (
            <Fragment key={column.id}>
              <ColumnContainer column={column} tasks={tasksByColumn[column.id]} onDeleteTask={removeTask} />
              {columns.length - 1 !== index && <Divider orientation="vertical" flexItem />}
            </Fragment>
          ))}
        </SortableContext>
      </Stack>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer column={activeColumn} tasks={tasksByColumn[activeColumn.id]} onDeleteTask={removeTask} />
          )}
          {activeTask && <TaskDnDCard task={activeTask} onDelete={deleteColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
export default TaskBoard;
