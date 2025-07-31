import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { memo } from 'react';

interface ModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  open: boolean;
  slotProps?: {
    dialog?: DialogProps;
  };
}

const Modal = ({ children, title, open, onClose, slotProps }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={(e) => {
        const event = e as React.MouseEvent<HTMLElement, MouseEvent>;
        event?.preventDefault?.();
        onClose(event);
      }}
      fullWidth
      maxWidth="sm"
      onClick={(e) => e.stopPropagation()}
      {...slotProps?.dialog}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
