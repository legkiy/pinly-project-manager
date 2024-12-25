import { LocaleSwitcher, ThemeSwitcher } from '@/features';
import { createMockData } from '@/shared/lib';
import { Project } from '@/shared/models';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  const mockData = createMockData<Project>(3, (step, id) => ({
    id,
    createdAt: new Date(),
    title: `project ${step}`,
    description: `description to project ${step}`,
  }));

  console.log(mockData);

  return (
    <div>
      <ThemeSwitcher />
      <LocaleSwitcher />
      {t('appName')}
    </div>
  );
};
export default HomePage;
