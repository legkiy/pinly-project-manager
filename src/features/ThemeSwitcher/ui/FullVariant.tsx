import { MenuItem, Select, Stack } from '@mui/material';
import { Text } from '@/shared/ui';
import { ThemeMode, themsOptionsList } from '../model';

interface Props {
  onClick: (theme: ThemeMode) => void;
  currentMode: ThemeMode;
}

const FullVariant = ({ onClick, currentMode }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Text mess="themes.select" />
      <Select value={currentMode} size="small">
        {themsOptionsList.map((el) => (
          <MenuItem key={el.option} onClick={() => onClick(el.option)} value={el.option}>
            <Text mess={`settings.themes.${el.option}`} />
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default FullVariant;
