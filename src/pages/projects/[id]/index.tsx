import { useProjectStore } from '@/entities/Project';
import { useTaskStore } from '@/entities/Task';
import { Kanban, ProjectHeader } from '@/widgets';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';

const ProjectIdPage = () => {
  const { id } = useParams();
  // const { project } = useProjectStore(id);
  // const { tasksList } = useTaskStore(project?.id);

  return (
    <Stack gap={1} height="100%">
      {/* <ProjectHeader project={project!} /> */}
      {/* <Kanban columns={project?.columns} initTasksList={tasksList} /> */}
      {/* <TaskBoard projectId={id ?? ''} columns={project?.columns ?? []} /> */}
    </Stack>
  );
};
export default ProjectIdPage;
