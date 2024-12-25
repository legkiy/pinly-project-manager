import { Themes } from '@/shared/models';
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
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.Light)}>
        Светлая Тема
      </Button>
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.Dark)}>
        Темная Тема
      </Button>
      <Button variant="contained" onClick={() => handleSwitchTheme(Themes.System)}>
        Системная Тема
      </Button>
    </Stack>
  );
};
export default ThemeSwitcher;
