import { Container, Grid, Stack } from '@mui/material';
import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';
import { NavigationBack } from '@/widgets';

const SettingsPage = () => {
  return (
    <Container>
      <NavigationBack
        title={<Text mess="settings.title" variant="h1" />}
        sx={{
          my: 2,
        }}
      />
      <Grid container spacing={2}>
        <Grid size={12}>
          <ThemeSwitcher variant="full" />
        </Grid>
        <Grid size={12}>
          <Stack justifyContent="space-between" direction="row">
            <Text mess="settings.lang.title" />
            <LocaleSwitcher />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SettingsPage;
