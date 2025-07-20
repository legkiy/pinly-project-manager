import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { memo } from 'react';
import { useModal } from '@/shared/lib';
import { Text } from '@/shared/ui';
import CreateForm from './CreateForm';

interface Props {
  projectId: string;
}

const CreateTask = ({ projectId }: Props) => {
  const { ModalComponent, ...modal } = useModal();

  return (
    <>
      <Button startIcon={<AddCircleRounded />} onClick={modal.toggleModal}>
        <Text mess="task.new" />
      </Button>
      <ModalComponent title={<Text mess="task.new" text />}>
        <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} projectId={projectId} />
      </ModalComponent>
    </>
  );
};
export default memo(CreateTask);
