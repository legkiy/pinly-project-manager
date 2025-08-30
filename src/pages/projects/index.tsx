import { Button, Container, Stack } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { ProjectsList, QuickSettings } from '@/widgets';
import { Link } from '@/shared/ui';
import { routerService } from '@/shared/lib';

const ProjectsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 1, height: '100vh' }}>
      <Stack gap={2} height="100%">
        <Stack direction="row" gap={2} justifyContent="center">
          <QuickSettings />
          <Link to={routerService.settings.root} display="flex">
            <Button
              variant="text"
              sx={{
                boxShadow: 1,
                backgroundColor: 'background.paper',
              }}
            >
              <SettingsRoundedIcon />
            </Button>
          </Link>
        </Stack>
        <ProjectsList />
      </Stack>
    </Container>
  );
};
export default ProjectsPage;
