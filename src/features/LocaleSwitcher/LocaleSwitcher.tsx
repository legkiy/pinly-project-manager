import { Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup variant="outlined">
      <Button onClick={() => handleChangeLang('en')} variant={i18n.language === 'en' ? 'contained' : 'outlined'}>
        EN
      </Button>
      <Button onClick={() => handleChangeLang('ru')} variant={i18n.language === 'ru' ? 'contained' : 'outlined'}>
        RU
      </Button>
    </ButtonGroup>
  );
};
export default LocaleSwitcher;
