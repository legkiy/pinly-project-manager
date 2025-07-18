import { PaletteOptions } from '@mui/material';

const paletteDark: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#3D5AFE', // Сохраняем синий для акцента
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#00E676', // Светло-зелёный
    contrastText: '#000000',
  },
  background: {
    default: '#111922', // Основной фон тёмной темы
    paper: '#1E1E1E', // Поверхности карточек
  },
  text: {
    primary: '#FFFFFF', // Основной текст
    secondary: '#B0BEC5', // Вторичный текст
  },
  divider: '#333333',
};
export default paletteDark;
