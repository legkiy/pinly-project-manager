import { Theme } from '@mui/material';

const shadows: Theme['shadows'] = [
  'none',
  '0 0 0 1px rgba(0, 0, 0, 0.1)',
  '0 4px 8px 0 rgba(0, 0, 0, .08), 0 0 4px 0 rgba(0, 0, 0, .04)',
  ...Array.from({ length: 24 }, () => '0 8px 16px 0 rgba(0, 0, 0, .08), 0 0 4px 0 rgba(0, 0, 0, .04)'),
] as Theme['shadows'];

export default shadows;
