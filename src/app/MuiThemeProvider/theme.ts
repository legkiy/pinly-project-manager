import { createTheme } from '@mui/material/styles';
import colorSchemes from './colorSchemes';
import typography from './typography';
import components from './components';
import shadows from './shadows';

const theme = createTheme({
  cssVariables: { cssVarPrefix: 'theme', colorSchemeSelector: 'data' },
  shape: {
    borderRadius: 16,
  },
  shadows,
  colorSchemes,
  typography,
  components,
  transitions: {
    duration: {
      enteringScreen: 200,
      leavingScreen: 200,
    },
  },
});

export default theme;
