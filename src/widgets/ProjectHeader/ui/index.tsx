import { Stack } from '@mui/material';
import { memo } from 'react';
import { Project } from '@/entities/Project';
import { Text } from '@/shared/ui';

interface Props {
  project: Project;
}

const ProjectHeader = ({ project }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Text mess={project.title} variant="h3" />
    </Stack>
  );
};
export default memo(ProjectHeader);
