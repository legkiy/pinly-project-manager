import { Theme } from '@mui/material';

const SHADOWS_MAP = {
  contained: '0px 8px 16px 0px rgba(24, 143, 255, 0.24)',
};

const components: Theme['components'] = {
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      contained: {
        width: 'fit-content',
        boxShadow: SHADOWS_MAP.contained,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      contained: {
        boxShadow: SHADOWS_MAP.contained,
      },
    },
  },
};

export default components;
