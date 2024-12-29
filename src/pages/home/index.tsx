import { ProjectsList, QuickSettings } from '@/widgets';
import { Container, Stack } from '@mui/material';

const HomePage = () => {
  return (
    <Container sx={{ p: 2, height: '100vh' }} maxWidth="lg">
      <Stack gap={2}>
        <QuickSettings />
        <ProjectsList />
      </Stack>
    </Container>
  );
};
export default HomePage;
