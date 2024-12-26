import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { Themes } from '@/shared/models';
import themes from './themes';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const lastSetTheme = (localStorage.getItem('theme') as Themes) ?? Themes.System;

  const THEMES_MAP = {
    [Themes.Dark]: themes.dark,
    [Themes.Light]: themes.light,
    [Themes.System]: prefersDarkMode ? themes.dark : themes.light,
  };

  return (
    <ThemeProvider theme={THEMES_MAP[lastSetTheme ?? Themes.System]}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
