import { useProjectStore } from '@/entities/Project';
import { TaskBoard } from '@/features';
import { ProjectHeader } from '@/widgets';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';

const ProjectIdPage = () => {
  const { id } = useParams();
  const { project } = useProjectStore(id);

  return (
    <Stack gap={1} height="100%">
      <ProjectHeader project={project!} />
      <TaskBoard projectId={id ?? ''} columns={project?.columns ?? []} />
    </Stack>
  );
};
export default ProjectIdPage;
