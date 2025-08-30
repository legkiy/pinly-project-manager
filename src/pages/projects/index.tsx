import { Button, Container, Paper, Stack } from '@mui/material';
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
            <Paper>
              <Button
                variant="text"
                sx={{
                  height: '100%',
                }}
              >
                <SettingsRoundedIcon />
              </Button>
            </Paper>
          </Link>
        </Stack>
        <ProjectsList />
      </Stack>
    </Container>
  );
};
export default ProjectsPage;
