import { Stack } from '@mui/material';
import { memo } from 'react';
import { Project } from '@/entities/Project';
import { Text } from '@/shared/ui';
import { OpenNotesDrawer } from '@/features';

interface Props {
  project: Project;
}

const ProjectHeader = ({ project }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Text mess={project.title} variant="h3" />
      <OpenNotesDrawer projectId={project.id} />
    </Stack>
  );
};
export default memo(ProjectHeader);
