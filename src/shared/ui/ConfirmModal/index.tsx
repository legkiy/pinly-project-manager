import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children }: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
