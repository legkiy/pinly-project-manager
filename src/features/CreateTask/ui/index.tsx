import { memo } from 'react';
import { CreateNewItem, Modal, Text } from '@/shared/ui';
import CreateForm from './CreateForm';

interface Props {
  projectId: string;
}

const CreateTask = ({ projectId }: Props) => {
  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  return (
    <>
      <CreateNewItem onClick={onOpenModal} titleKey="task.new" variant="button" />
      <Modal.Component title={<Text mess="task.new" text />} open={modalState} onClose={onCloseModal}>
        <CreateForm onCancel={onCloseModal} onSubmit={onCloseModal} projectId={projectId} />
      </Modal.Component>
    </>
  );
};
export default memo(CreateTask);
