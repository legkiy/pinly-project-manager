import { createMockData } from '@/shared/lib';
import { Text } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';
import { Project } from '../model';
import ProjectCard from './ProjectCard';
import { scrollbarStyles } from '@/shared/models';

const CARD_SIZE = { width: 366, height: 166 };

const ProjectsList = () => {
  const mockData = createMockData<Project>(48, (step, id) => ({
    id,
    createdAt: new Date(),
    title: `project ${step}`,
    description: `description to project ${step}`,
  }));
  return (
    <Stack gap={2}>
      <Typography
        variant="h3"
        sx={{
          mx: 1,
        }}
      >
        <Text mess="avalableProjectsCount" options={{ count: '1' }} />
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          gap: 2,
          // border: '1px solid red',
          // height: 640,
          overflowY: 'scroll',
          justifyContent: 'center',
          p: 1,
        }}
        className={scrollbarStyles.default}
      >
        {mockData.map((project) => (
          <ProjectCard key={project.id} {...project} {...CARD_SIZE} />
        ))}
      </Stack>
    </Stack>
  );
};
export default ProjectsList;
