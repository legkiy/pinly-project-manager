import { useProjectStore } from '@/entities/Project';
import { LocaleSwitcher, StartPageSetter, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';
import { Card, CardContent, Stack, Typography } from '@mui/material';

interface Props {
  collapse?: boolean;
}

const QuickSettings = ({ collapse }: Props) => {
  const { projectsList } = useProjectStore();
  if (collapse) {
    return <div>QuickSettings collapse</div>;
  }
  return (
    <Card
      elevation={1}
      sx={{
        width: 'fit-content',
        alignSelf: 'center',
        flexShrink: 0,
      }}
    >
      <CardContent>
        <Stack direction="row" gap={3} alignItems="center" justifyContent="center">
          <Typography variant="h4">
            <Text mess="settings.quick" />
          </Typography>
          <ThemeSwitcher />
          <LocaleSwitcher />
          <StartPageSetter projects={projectsList} />
        </Stack>
      </CardContent>
    </Card>
  );
};
export default QuickSettings;
