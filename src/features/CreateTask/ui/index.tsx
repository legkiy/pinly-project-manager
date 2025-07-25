import { Button } from '@mui/material';
import { memo } from 'react';
import { Modal, Text } from '@/shared/ui';
import CreateForm from './CreateForm';

interface Props {
  projectId: string;
}

const CreateTask = ({ projectId }: Props) => {
  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  return (
    <>
      <Button size="medium" sx={{ height: 'fit-content' }} onClick={onOpenModal}>
        <Text mess="task.new" text />
      </Button>
      <Modal.Component title={<Text mess="task.new" text />} open={modalState} onClose={onCloseModal}>
        <CreateForm onCancel={onCloseModal} onSubmit={onCloseModal} projectId={projectId} />
      </Modal.Component>
    </>
  );
};
export default memo(CreateTask);
