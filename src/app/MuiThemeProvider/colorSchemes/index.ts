import { ColorSystemOptions } from '@mui/material/styles';
import paletteLight from './light';
import paletteDark from './dark';

const colorSchemes: Partial<Record<'light' | 'dark', boolean | ColorSystemOptions>> &
  Record<never, ColorSystemOptions> = {
  light: {
    palette: paletteLight,
  },
  dark: {
    palette: paletteDark,
  },
};

export default colorSchemes;
