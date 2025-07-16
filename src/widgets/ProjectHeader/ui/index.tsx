import { Project } from '@/entities/Project';
import { CreateTask } from '@/features';
import { Text } from '@/shared/ui';
import { Box, Stack } from '@mui/material';
import { memo } from 'react';

interface Props {
  project: Project;
}

const ProjectHeader = ({ project }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Text mess={project.title} variant="h3" />
      <Box alignContent="center">
        <CreateTask projectId={project.id} />
      </Box>
    </Stack>
  );
};
export default memo(ProjectHeader);
