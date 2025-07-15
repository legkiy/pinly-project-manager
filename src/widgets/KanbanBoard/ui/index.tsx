import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import SortableColumn from './SortableColumn';
import { Project, useProjectStore } from '@/entities/Project';
import { createPortal } from 'react-dom';
import { DndItemType } from '../model';

interface KanbanBoardProps {
  project: Project;
}

const KanbanBoard = ({ project }: KanbanBoardProps) => {
  const { columns, tasks, createColumn, moveColumn, sortTasks, moveTask } = useProjectStore();
  const [activeDragItem, setActiveDragItem] = useState<{ type: DndItemType; id: string } | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const sensors = useSensors(pointerSensor);

  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim() !== '') {
      createColumn(project.id, newColumnTitle.trim());
      setNewColumnTitle('');
    }
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeId = active.id as string;

    if (active.data.current?.type === DndItemType.Task) {
      setActiveDragItem({ id: activeId, type: DndItemType.Task });
      return;
    }
    if (active.data.current?.type === DndItemType.Column) {
      setActiveDragItem({ id: activeId, type: DndItemType.Column });
      return;
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over?.id as string;

    if (activeId === overId) return;
    const activeType: DndItemType = active.data.current?.type;
    const overType: DndItemType = over.data.current?.type;

    const isActiveTask = activeType === DndItemType.Task;
    const isOverTask = overType === DndItemType.Task;
    if (!isActiveTask) return;
    const overColId = isOverTask ? tasks[overId].columnId : overId;
    if (overColId === tasks[activeId].columnId) return;
    moveTask(activeId, overColId);
    return;
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over?.id as string;
    if (overId == activeId) return;

    const activeType: DndItemType = active.data.current?.type;
    const overType: DndItemType = over.data.current?.type;

    // Перемещение колонки
    if (activeType === DndItemType.Column && overType === DndItemType.Column) {
      const oldIndex = project.columnsIds.indexOf(activeId);
      const newIndex = project.columnsIds.indexOf(overId);

      const newOrder = arrayMove(project.columnsIds, oldIndex, newIndex);
      moveColumn(project.id, newOrder);
      return;
    }

    // Перемещение задачи внутри колонки
    if (activeType === DndItemType.Task) {
      const startColumn = columns[tasks[activeId].columnId];

      if (overType === DndItemType.Task) {
        const oldIndex = startColumn.taskIds.indexOf(activeId);
        const newIndex = startColumn.taskIds.indexOf(overId);

        const updateStartColumn = arrayMove(startColumn.taskIds, oldIndex, newIndex);

        sortTasks(startColumn.id, updateStartColumn);
        return;
      }
    }
  };

  return (
    <Box>
      <Stack direction="row" gap={2} overflow="auto" py={2}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveDragItem(null)}
        >
          <SortableContext items={project.columnsIds} strategy={horizontalListSortingStrategy}>
            {project.columnsIds.map((colId) => (
              <SortableColumn key={colId} id={colId} />
            ))}
            <Box
              display="flex"
              gap={1}
              mt={2}
              sx={{
                minWidth: 220,
              }}
            >
              <TextField
                label="Новая колонка"
                size="small"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
              <IconButton onClick={handleAddColumn} color="primary">
                ➕
              </IconButton>
            </Box>
          </SortableContext>
          {createPortal(
            <DragOverlay
              dropAnimation={{
                duration: 400,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: '0.5',
                    },
                  },
                }),
              }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(255, 200, 200, 1)',
                  width: 220,
                  height: 70,
                }}
              >
                {activeDragItem?.type}
              </Box>
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </Stack>
    </Box>
  );
};

export default KanbanBoard;
