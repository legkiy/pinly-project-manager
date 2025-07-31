import { SxProps, Theme } from '@mui/material';
import { lazy, memo } from 'react';

const ButtonVariant = lazy(() => import('./ButtonVariant'));
const ZoneVariant = lazy(() => import('./ZoneVariant'));

export interface IGeneralCreateNewItemProps {
  titleKey: string | string[];
  to?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}
interface Props extends IGeneralCreateNewItemProps {
  variant?: 'zone' | 'button';
}

const CreateNewItem = ({ variant = 'zone', ...props }: Props) => {
  return variant === 'button' ? <ButtonVariant {...props} /> : <ZoneVariant {...props} />;
};
export default memo(CreateNewItem);
