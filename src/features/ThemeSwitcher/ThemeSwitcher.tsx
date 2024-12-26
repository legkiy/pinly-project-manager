import { Themes } from '@/shared/models';
import { Button, ButtonGroup, useColorScheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';

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
    <ButtonGroup>
      <Button
        onClick={() => handleSwitchTheme(Themes.Light)}
        variant={mode === Themes.Light ? 'contained' : 'outlined'}
      >
        <LightModeRoundedIcon />
      </Button>
      <Button onClick={() => handleSwitchTheme(Themes.Dark)} variant={mode === Themes.Dark ? 'contained' : 'outlined'}>
        <DarkModeOutlinedIcon />
      </Button>
      <Button
        onClick={() => handleSwitchTheme(Themes.System)}
        variant={mode === Themes.System ? 'contained' : 'outlined'}
      >
        <ContrastRoundedIcon />
      </Button>
    </ButtonGroup>
  );
};
export default ThemeSwitcher;
