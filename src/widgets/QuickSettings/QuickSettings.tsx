import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';

interface Props {
  collapse?: boolean;
}

const QuickSettings = ({ collapse }: Props) => {
  if (collapse) {
    return <div>QuickSettings collapse</div>;
  }
  return (
    <Stack direction="row" gap={3} alignItems="center">
      <Typography variant="h4">
        <Text mess="settings.quick" />
      </Typography>
      <ThemeSwitcher />
      <LocaleSwitcher />
    </Stack>
  );
};
export default QuickSettings;
