import { Card, CardContent, Stack } from '@mui/material';
import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { Text } from '@/shared/ui';

interface Props {
  collapse?: boolean;
}

const QuickSettings = ({ collapse }: Props) => {
  // const { projects } = useProjectStore();
  if (collapse) {
    return <div>QuickSettings collapse</div>;
  }

  // const projectsList = Object.values(projects);
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
          <Text mess="settings.quick" variant="h4" />
          <ThemeSwitcher />
          <LocaleSwitcher />
          {/* <StartPageSetter projects={projectsList} /> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
export default QuickSettings;
