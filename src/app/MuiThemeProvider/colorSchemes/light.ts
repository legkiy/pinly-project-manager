import { PaletteOptions } from '@mui/material';
import generalColors from './generalColors';

const paletteLight: PaletteOptions = {
  ...generalColors,
  mode: 'light',
  primary: {
    main: '#4A6CF7', // Мягкий индиго/синий
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#6C757D', // Нейтральный серо-синий
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8fafc',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
  },
  divider: '#E0E0E0',
};
export default paletteLight;
