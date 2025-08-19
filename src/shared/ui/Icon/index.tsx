import { Box, BoxProps } from '@mui/material';
import ICONS_MAP from '@/shared/assets/icons';

interface Props extends Omit<BoxProps<'img'>, 'src'> {
  iconName: keyof typeof ICONS_MAP;
}

const Icon = ({ iconName, ...props }: Props) => {
  return <Box component="img" src={ICONS_MAP[iconName]} {...props} />;
};

export default Icon;
