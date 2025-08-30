import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';

export const enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export const themsOptionsList = [
  {
  option: ThemeMode.Light,
  icon: LightModeRoundedIcon,
},
  {
    option: ThemeMode.Dark,
    icon: DarkModeOutlinedIcon,
  },
    {
    option: ThemeMode.System,
    icon: ContrastRoundedIcon,
  },
];
