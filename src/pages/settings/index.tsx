import { LocaleSwitcher, ThemeSwitcher } from '@/features';

const SettingsPage = () => {
  return (
    <div>
      <ThemeSwitcher />
      <LocaleSwitcher />
    </div>
  );
};
export default SettingsPage;
