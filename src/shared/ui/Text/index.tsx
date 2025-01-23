import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

interface TextProps {
  mess: string;
  options?: TOptions;
}

const Text = ({ mess, options }: TextProps) => {
  const { t } = useTranslation();

  return t(mess, options);
};
export default Text;
