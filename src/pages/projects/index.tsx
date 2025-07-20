import { Container, Stack } from '@mui/material';
import { ProjectsList, QuickSettings } from '@/widgets';

const ProjectsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 1, height: '100vh' }}>
      <Stack gap={2} height="100%">
        <QuickSettings />
        <ProjectsList />
      </Stack>
    </Container>
  );
};
export default ProjectsPage;
