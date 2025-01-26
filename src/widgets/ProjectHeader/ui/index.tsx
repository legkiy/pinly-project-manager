import { Project } from '@/entities/Project';
import { CreateTask } from '@/features';
import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface Props {
  project: Project;
}

const ProjectHeader = ({ project }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h3">{project?.name}</Typography>
      <Box alignContent="center">
        <CreateTask projectId={project.id} columnId={project.columns[0].id} />
      </Box>
    </Stack>
  );
};
export default memo(ProjectHeader);
