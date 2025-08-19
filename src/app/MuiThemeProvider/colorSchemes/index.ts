import { ColorSystemOptions } from '@mui/material/styles';
import paletteLight from './light';
import paletteDark from './dark';

declare module '@mui/material/styles' {
  interface Palette {
    note: {
      main: string;
    };
  }
  interface PaletteOptions {
    note?: {
      main?: string;
    };
  }
}

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
