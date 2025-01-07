import { TaskBoard } from '@/features';
import { Text } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';

const ProjectIdPage = () => {
  return (
    <Stack gap={1} height="100%">
      <Typography>
        <Text mess="kanban.title" />
      </Typography>
      <TaskBoard />
    </Stack>
  );
};
export default ProjectIdPage;
