import { createTheme } from '@mui/material';
import palette from './palette';
import typography from './typography';
import components from './components';

const light = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  palette: palette.light,
  typography,
  components,
});

const dark = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  palette: palette.dark,
  typography,
  components,
});

export default { light, dark };
