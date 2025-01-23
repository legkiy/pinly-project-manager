import { Button, Divider, Stack } from '@mui/material';
import { Text } from '@/shared/ui';
import AddRounded from '@mui/icons-material/AddRounded';
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
import { Fragment, useMemo, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Task, TaskStatus, UniqEntity } from '@/shared/models';
import { createPortal } from 'react-dom';
import { checkDragItemType, useTaskBoard } from '../lib';
import { generateId } from '@/shared/lib';
import TaskDnDCard from './TaskDnDCard';

// TODO: move task actions in store

const TaskBoard = () => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });
  const sensors = useSensors(pointerSensor);

  const { createColumn, deleteColumn, moveColumn, columns } = useTaskBoard();

  const columnsIds = useMemo(() => columns.map((column) => column.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<UniqEntity | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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
    if (checkDragItemType(active, DnDItemType.Column)) {
      moveColumn(active.id, over.id);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    if (!checkDragItemType(active, DnDItemType.Task)) return;

    // Task over another Task
    if (checkDragItemType(over, DnDItemType.Task)) {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((task) => task.id === active.id);
        const overIndex = prev.findIndex((task) => task.id === over.id);
        prev[activeIndex].columnId = prev[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Task over column
    if (checkDragItemType(over, DnDItemType.Column)) {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((task) => task.id === active.id);
        prev[activeIndex].columnId = over.id as string;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleOnCreateTask = (columnId: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      createdAt: new Date(),
      name: `Task №${tasks.length + 1}`,
      description: `Task description №${tasks.length + 1}`,
      status: TaskStatus.Queue,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    const filtredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filtredTasks);
  };

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
              <ColumnContainer
                column={column}
                onDelete={deleteColumn}
                creteTask={handleOnCreateTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                onDeleteTask={handleDeleteTask}
              />
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
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              onDelete={deleteColumn}
              creteTask={handleOnCreateTask}
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              onDeleteTask={handleDeleteTask}
            />
          )}
          {activeTask && <TaskDnDCard task={activeTask} onDelete={deleteColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
export default TaskBoard;
