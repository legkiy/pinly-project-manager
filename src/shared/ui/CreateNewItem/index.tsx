import { ButtonProps, SxProps, Theme } from '@mui/material';
import { lazy, memo } from 'react';

const ButtonVariant = lazy(() => import('./ButtonVariant'));
const ZoneVariant = lazy(() => import('./ZoneVariant'));

export interface IGeneralCreateNewItemProps {
  titleKey: string | string[];
  to?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export type PropsButton = IGeneralCreateNewItemProps &
  ButtonProps & {
    type?: 'button';
  };

type Props =
  | PropsButton
  | (IGeneralCreateNewItemProps & {
      type?: 'zone';
    });

const CreateNewItem = ({ type = 'zone', ...props }: Props) => {
  return type === 'button' ? <ButtonVariant {...props} /> : <ZoneVariant {...props} />;
};
export default memo(CreateNewItem);
