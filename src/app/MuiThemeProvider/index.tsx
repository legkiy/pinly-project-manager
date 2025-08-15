import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = (props: Props) => {
  return (
    <ThemeProvider theme={theme} defaultMode="system" noSsr>
      {/* <CssVarsProvider theme={theme} defaultMode="system"> */}
      {/* </CssVarsProvider> */}
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
export default MuiThemeProvider;
