import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);

  return { open, toggleModal, onClose: () => setOpen(false), onOpen: () => setOpen(true) };
};

export default useModal;
