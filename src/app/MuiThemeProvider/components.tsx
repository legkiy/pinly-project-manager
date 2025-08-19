import { alpha, Theme } from '@mui/material';

const SHADOWS_MAP = {
  contained: '0px 2px 16px 0px rgba(24, 143, 255, 0.24)',
};

const components: Theme['components'] = {
  MuiTextField: {
    defaultProps: {
      autoComplete: 'off',
    },
    styleOverrides: {
      root: {
        // Remove underline for all variants
        '& .MuiInputBase-root:before': {
          borderBottom: 'none',
        },
        '& .MuiInputBase-root:after': {
          borderBottom: 'none',
        },
        '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
          borderBottom: 'none',
        },
      },
    },
  },
  MuiButtonGroup: {
    styleOverrides: {
      contained: {
        width: 'fit-content',
        boxShadow: SHADOWS_MAP.contained,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    variants: [
      {
        props: { variant: 'square' },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        style: ({ theme, color }) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          const paletteColor = theme.palette[color ?? 'primary'];
          return {
            boxShadow: SHADOWS_MAP.contained,
            padding: 4,
            minWidth: 'unset',
            borderRadius: +theme.shape.borderRadius * 0.64,
            backgroundColor: paletteColor.main,
            color: paletteColor.contrastText,
            '&:hover': {
              backgroundColor: paletteColor.dark,
              boxShadow: theme.shadows[4],
            },
            '&:active': {
              boxShadow: theme.shadows[1],
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
              boxShadow: 'none',
            },
          };
        },
      },
    ],
    styleOverrides: {
      contained: {
        boxShadow: SHADOWS_MAP.contained,
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 5,
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 12,
        '&:last-child': {
          paddingBottom: 12,
        },
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: () => ({
        backdropFilter: 'blur(2px)',
        backgroundColor: alpha('#000', 0.05),
      }),
      invisible: {
        backdropFilter: 'none',
        backgroundColor: 'transparent',
      },
    },
  },
};

export default components;
