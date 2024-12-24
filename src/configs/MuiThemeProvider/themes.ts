import { createTheme } from '@mui/material';
import darkThemePart from './dark';
import lightThemePart from './light';

const dark = createTheme({
  palette: darkThemePart.palette,
  typography: darkThemePart.typography,
  components: {},
});

const light = createTheme({
  palette: lightThemePart.palette,
  typography: lightThemePart.typography,
  components: {},
});

export default { light, dark };
