import { Button, ButtonGroup } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import { useThemeStore } from '../lib';
import { ThemeMode } from '../model';

const ThemeSwitcher = () => {
  const { mode, setThemeMode } = useThemeStore();

  const handleSwitchTheme = (theme: ThemeMode) => {
    setThemeMode(theme);
  };

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
