import { createMockArray } from '@/shared/lib';
import { Project } from '@/shared/models';
import { ProjectsList, QuickSettings } from '@/widgets';
import { Container, Stack } from '@mui/material';

const mockData = createMockArray<Project>(4, (step, id) => ({
  id,
  createdAt: new Date(),
  name: `project ${step}`,
  description: `description to project ${step}`,
}));

const MainPage = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 1, height: '100vh' }}>
      <Stack gap={2} height="100%">
        <QuickSettings projects={mockData} />
        <ProjectsList projects={mockData} />
      </Stack>
    </Container>
  );
};
export default MainPage;
