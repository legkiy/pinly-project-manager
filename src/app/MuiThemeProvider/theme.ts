import { createTheme } from '@mui/material';
import colorSchemes from './colorSchemes';
import typography from './typography';
import components from './components';
import shadows from './shadows';

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  shadows,
  colorSchemes,
  typography,
  components,
});

export default theme;
