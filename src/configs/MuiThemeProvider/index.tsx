import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import themes from './themes';
import { Themes } from '@/shared/types';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  const currentThemeKey = (localStorage.getItem('theme') as Themes) ?? Themes.System;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? themes.dark : themes.light;

  const selectedTheme = currentThemeKey === Themes.System ? prefersDarkMode : themes[currentThemeKey];

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
