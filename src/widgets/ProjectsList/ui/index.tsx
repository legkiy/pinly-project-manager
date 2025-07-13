import { Text } from '@/shared/ui';
import { Box, Stack } from '@mui/material';
import { CreateProject } from '@/features';
import { ProjectCard, useProjectStore } from '@/entities/Project';

const CARD_SIZE = { width: 355, height: 200 };

const ProjectsList = () => {
  const { projects } = useProjectStore();

  const projectsList = Object.values(projects);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mx: 2,
        }}
      >
        <Text mess="avalableProjectsCount" options={{ count: projectsList.length }} variant="h3" />
        <CreateProject />
      </Stack>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(calc(50% - 16px), calc(50% - 16px)))',
          }}
        >
          {projectsList.map((project) => (
            <ProjectCard key={project.id} {...project} {...CARD_SIZE} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default ProjectsList;
