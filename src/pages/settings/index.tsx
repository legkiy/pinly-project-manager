import { Container, Divider, Grid, Stack } from '@mui/material';
import { ClearAppData, LocaleSwitcher, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';
import { NavigationBack } from '@/widgets';

const SettingsPage = () => {
  return (
    <Container maxWidth="md">
      <NavigationBack
        title={<Text mess="settings.title" variant="h1" />}
        sx={{
          my: 2,
        }}
      />
      <Stack gap={2}>
        <ThemeSwitcher variant="full" />
        <Stack justifyContent="space-between" direction="row">
          <Text mess="settings.lang.title" />
          <LocaleSwitcher />
        </Stack>
        <Divider />
        <ClearAppData />
      </Stack>
    </Container>
  );
};
export default SettingsPage;
