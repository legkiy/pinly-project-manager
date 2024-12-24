import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ThemeSwitcher />
      <LocaleSwitcher />
      {t('appName')}
    </div>
  );
};
export default HomePage;
