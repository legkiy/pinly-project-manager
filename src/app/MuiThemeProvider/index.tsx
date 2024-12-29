import { ThemeMode, useThemeStore } from '@/features/ThemeSwitcher';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import typography from './typography';
import components from './components';
import palette from './palette';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode } = useThemeStore();

  const THEMES_MAP = {
    [ThemeMode.Dark]: palette.dark,
    [ThemeMode.Light]: palette.light,
    [ThemeMode.System]: prefersDarkMode ? palette.dark : palette.light,
  };

  const theme = createTheme({
    shape: {
      borderRadius: 10,
    },
    palette: THEMES_MAP[mode ?? ThemeMode.System],
    typography,
    components,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
