import { createMockData } from '@/shared/lib';
import { Project } from '@/shared/models';
import { Text } from '@/shared/ui';
import { QuickSettings } from '@/widgets';
import { Container } from '@mui/material';

const HomePage = () => {
  const mockData = createMockData<Project>(3, (step, id) => ({
    id,
    createdAt: new Date(),
    title: `project ${step}`,
    description: `description to project ${step}`,
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <QuickSettings />
      <Text mess="appName" />
    </Container>
  );
};
export default HomePage;
