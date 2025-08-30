import { Grid, Stack } from '@mui/material';
import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';

const SettingsPage = () => {
  return (
    <Grid container>
      <Text mess="settings.title" />
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
  );
};
export default SettingsPage;
