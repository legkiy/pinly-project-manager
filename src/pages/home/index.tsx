import { ProjectsList, QuickSettings } from '@/widgets';
import { Container, Stack } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 1, height: '100vh' }}>
      <Stack gap={2} height="100%">
        <QuickSettings />
        <ProjectsList />
      </Stack>
    </Container>
  );
};
export default HomePage;
