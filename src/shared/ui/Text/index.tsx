import { useTranslation } from 'react-i18next';

interface TextProps {
  mess: string;
}

const Text = ({ mess }: TextProps) => {
  const { t } = useTranslation();

  return t(mess);
};
export default Text;
