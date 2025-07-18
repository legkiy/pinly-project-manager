import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  return (
    <ThemeProvider theme={theme} defaultMode="system" noSsr>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
