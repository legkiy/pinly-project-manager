import { ThemeMode, useThemeStore } from '@/features/ThemeSwitcher';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import typography from './typography';
import components from './components';
import dark from './palette/dark';
import light from './palette/light';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode } = useThemeStore();

  const THEMES_MAP = {
    [ThemeMode.Dark]: dark,
    [ThemeMode.Light]: light,
    [ThemeMode.System]: prefersDarkMode ? dark : light,
  };

  const theme = createTheme({
    shape: {
      borderRadius: 14,
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
