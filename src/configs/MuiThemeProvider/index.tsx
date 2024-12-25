import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { Themes } from '@/shared/models';
import palette from './palette';
import typography from './typography';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? palette.dark : palette.light;
  const savedTheme: Themes = localStorage.getItem('theme') as Themes;

  const THEMES_PALETTE_MAP = {
    [Themes.Dark]: palette.dark,
    [Themes.Light]: palette.light,
    [Themes.System]: prefersDarkMode,
  };

  const appTheme = createTheme({
    colorSchemes: {
      dark: true,
      light: true,
    },
    palette: THEMES_PALETTE_MAP[savedTheme],
    typography,
    components: {},
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
