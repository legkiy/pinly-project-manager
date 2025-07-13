import { useProjectStore } from '@/entities/Project';
import { CreateTask } from '@/features';
import { KanbanBoard } from '@/widgets';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';

const ProjectIdPage = () => {
  const { id } = useParams();
  const project = useProjectStore((state) => state.projects[id!]);

  return (
    <Stack gap={1} height="100%">
      <CreateTask projectId={id!} />
      <KanbanBoard project={project} />
    </Stack>
  );
};
export default ProjectIdPage;
