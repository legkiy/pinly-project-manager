import { createMockArray } from '@/shared/lib';
import { Text } from '@/shared/ui';
import { Box, Typography } from '@mui/material';
import { Project } from '../model';
import ProjectCard from './ProjectCard';

const CARD_SIZE = { width: 364, height: 204 };

const ProjectsList = () => {
  const mockData = createMockArray<Project>(6, (step, id) => ({
    id,
    createdAt: new Date(),
    name: `project ${step}`,
    description: `description to project ${step}`,
  }));

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mx: 1,
        }}
      >
        <Text mess="avalableProjectsCount" options={{ count: mockData.length }} />
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(calc(50% - 16px), 1fr))',
          }}
        >
          {mockData.map((project) => (
            <ProjectCard key={project.id} {...project} {...CARD_SIZE} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default ProjectsList;
