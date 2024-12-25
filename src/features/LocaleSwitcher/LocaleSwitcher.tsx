import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Stack>
      <Button onClick={() => handleChangeLang('en')}>EN</Button>
      <Button onClick={() => handleChangeLang('ru')}>RU</Button>
    </Stack>
  );
};
export default LocaleSwitcher;
