import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);

  const ModalComponent = ({ children, title }: { children: React.ReactNode; title: React.ReactNode }) => (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );

  return { open, toggleModal, onClose: () => setOpen(false), onOpen: () => setOpen(true), ModalComponent };
};

export default useModal;
