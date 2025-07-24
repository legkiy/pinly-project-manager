import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { memo } from 'react';

interface ModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  slotProps?: {
    dialog?: DialogProps;
  };
}

const Modal = ({ children, title, open, onClose, slotProps }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" {...slotProps?.dialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
