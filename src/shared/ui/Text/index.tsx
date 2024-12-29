import { useTranslation } from 'react-i18next';

interface TextProps {
  mess: string;
  options?: Record<string, string>;
}

const Text = ({ mess, options }: TextProps) => {
  const { t } = useTranslation();

  return t(mess, options);
};
export default Text;
