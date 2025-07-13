import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import SortableColumn from './SortableColumn';
import { Project, useProjectStore } from '@/entities/Project';

interface KanbanBoardProps {
  project: Project;
}

const KanbanBoard = ({ project }: KanbanBoardProps) => {
  const createColumn = useProjectStore((s) => s.createColumn);
  const moveColumn = useProjectStore((s) => s.moveColumn);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = project.columnsIds.indexOf(active.id as string);
    const newIndex = project.columnsIds.indexOf(over.id as string);

    const newOrder = arrayMove(project.columnsIds, oldIndex, newIndex);
    moveColumn(project.id!, newOrder);
  };

  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim() !== '') {
      createColumn(project.id, newColumnTitle.trim());
      setNewColumnTitle('');
    }
  };

  return (
    <Box>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={project.columnsIds} strategy={horizontalListSortingStrategy}>
          <Stack direction="row" gap={2} overflow="auto" py={2}>
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
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
