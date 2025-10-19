import { Button } from '@mui/material';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const MenuBtn: FC<Props> = ({ children, onClick, active, disabled }) => {
  return (
    <Button size="small" onClick={onClick} variant={active ? 'contained' : 'text'} disabled={disabled}>
      {children}
    </Button>
  );
};
export default MenuBtn;
