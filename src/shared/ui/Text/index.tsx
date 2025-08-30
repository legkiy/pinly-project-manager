import { Typography, TypographyProps } from '@mui/material';
import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

interface TextPropsTypogrphy extends Omit<TypographyProps, 'children'> {
  mess: string | string[];
  options?: TOptions;
  text?: false;
}

interface TextPropsNoTypogrphy {
  mess: string | string[];
  options?: TOptions;
  text: true;
}

type TextProps = TextPropsTypogrphy | TextPropsNoTypogrphy;

const Text = ({ mess, options, text, ...typographyProps }: TextProps) => {
  const { t } = useTranslation();

  const formatedText = Array.isArray(mess) ? mess.map((item) => t(item, options)).join('') : t(mess, options);

  if (text) {
    return formatedText;
  }

  return (
    <Typography variant="body1" {...typographyProps}>
      {formatedText}
    </Typography>
  );
};
export default Text;
