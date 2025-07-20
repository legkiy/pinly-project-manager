import { Box, Grid, Stack } from '@mui/material';
import { Text } from '@/shared/ui';
import { CreateProject } from '@/features';
import { ProjectCard, useProjectStore } from '@/entities/Project';

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
        <Text mess="project.avalableCount" options={{ count: projectsList.length }} variant="h3" />
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
        <Grid container spacing={2}>
          {projectsList.map((project) => (
            <Grid key={project.id} size={6}>
              <ProjectCard key={project.id} {...project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default ProjectsList;
