import { useCallback, useState } from 'react';

interface IUseModal {
  onOpen?: () => void;
  onClose?: () => void;
}

const useModal = (props?: IUseModal) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    props?.onOpen?.();
  }, [props?.onOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    props?.onClose?.();
  }, [props?.onClose]);

  return {
    modalState: open,
    onOpenModal: handleOpen,
    onCloseModal: handleClose,
  };
};

export default useModal;
