import { Stack } from '@mui/material';
import { Outlet, useParams } from 'react-router';
import { useProjectStore } from '@/entities/Project';
import { KanbanBoard, ProjectHeader } from '@/widgets';

const ProjectIdPage = () => {
  const { projectId } = useParams();
  const project = useProjectStore((state) => state.projects[projectId!]);

  return (
    <Stack gap={1} height="100%">
      <Outlet />
      <ProjectHeader project={project} />
      <KanbanBoard project={project} />
    </Stack>
  );
};
export default ProjectIdPage;
