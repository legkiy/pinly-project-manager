import { useCallback, useState } from 'react';

interface IUseModal {
  onOpen?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const useModal = (props?: IUseModal) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setOpen(true);
      props?.onOpen?.(e);
    },
    [props?.onOpen]
  );

  const handleClose = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setOpen(false);
      props?.onClose?.(e);
    },
    [props?.onClose]
  );

  return {
    modalState: open,
    onOpenModal: handleOpen,
    onCloseModal: handleClose,
  };
};

export default useModal;
