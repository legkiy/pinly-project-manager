import { Button, ButtonGroup, useColorScheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import { ThemeMode } from '../model';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  const handleSwitchTheme = (theme: ThemeMode) => {
    // setThemeMode(theme);
    setMode(theme);
  };

  if (!mode) {
    return null;
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => handleSwitchTheme(ThemeMode.Light)}
        variant={mode === ThemeMode.Light ? 'contained' : 'outlined'}
      >
        <LightModeRoundedIcon />
      </Button>
      <Button
        onClick={() => handleSwitchTheme(ThemeMode.Dark)}
        variant={mode === ThemeMode.Dark ? 'contained' : 'outlined'}
      >
        <DarkModeOutlinedIcon />
      </Button>
      <Button
        onClick={() => handleSwitchTheme(ThemeMode.System)}
        variant={mode === ThemeMode.System ? 'contained' : 'outlined'}
      >
        <ContrastRoundedIcon />
      </Button>
    </ButtonGroup>
  );
};
export default ThemeSwitcher;
