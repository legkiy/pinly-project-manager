import { Themes } from '@/shared/types';
import { Button, Stack, useColorScheme } from '@mui/material';

const ThemeSwitcher = () => {
  const { setMode, mode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleSwitchTheme = (theme: Themes) => {
    localStorage.setItem('theme', theme);
    setMode(theme);
  };

  return (
    <Stack>
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.Light)} style={{ marginRight: '10px' }}>
        Светлая Тема
      </Button>
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.Dark)} style={{ marginRight: '10px' }}>
        Темная Тема
      </Button>
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.System)}>
        Системная Тема
      </Button>
    </Stack>
  );
};
export default ThemeSwitcher;
