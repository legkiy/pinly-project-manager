import { useProjectStore } from '@/entities/Project';
import { KanbanBoard, ProjectHeader } from '@/widgets';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';

const ProjectIdPage = () => {
  const { id } = useParams();
  const project = useProjectStore((state) => state.projects[id!]);

  return (
    <Stack gap={1} height="100%">
      <ProjectHeader project={project} />
      <KanbanBoard project={project} />
    </Stack>
  );
};
export default ProjectIdPage;
