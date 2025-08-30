import { lazy } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { ThemeMode } from '../model';

const FullVariant = lazy(() => import('./FullVariant'));
const ShortVariant = lazy(() => import('./ShortVariant'));

interface Props {
  variant?: 'full' | 'short';
}

const ThemeSwitcher = ({ variant = 'short' }: Props) => {
  const { mode, setMode } = useColorScheme();

  const handleSwitchTheme = (theme: ThemeMode) => {
    setMode(theme);
  };

  if (!mode) {
    return null;
  }

  return variant === 'full' ? (
    <FullVariant onClick={handleSwitchTheme} currentMode={mode as ThemeMode} />
  ) : (
    <ShortVariant onClick={handleSwitchTheme} currentMode={mode as ThemeMode} />
  );
};
export default ThemeSwitcher;
