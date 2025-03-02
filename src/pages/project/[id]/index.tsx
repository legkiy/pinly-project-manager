import { useProjectStore } from '@/entities/Project';
import { TaskBoard } from '@/features';
import { Kanban, ProjectHeader } from '@/widgets';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';

const ProjectIdPage = () => {
  const { id } = useParams();
  const { project } = useProjectStore(id);
  console.log(project);

  return (
    <Stack gap={1} height="100%">
      <ProjectHeader project={project!} />
      <Kanban columns={project?.columns} />
      {/* <TaskBoard projectId={id ?? ''} columns={project?.columns ?? []} /> */}
    </Stack>
  );
};
export default ProjectIdPage;
