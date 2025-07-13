import { useModal } from '@/shared/lib';
import { Text } from '@/shared/ui';
import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import CreateForm from './CreateForm';
import { memo } from 'react';

interface Props {
  projectId: string;
}

const CreateTask = ({ projectId }: Props) => {
  const { ModalComponent, ...modal } = useModal();

  return (
    <>
      <Button startIcon={<AddCircleRounded />} onClick={modal.toggleModal}>
        <Text mess="kanban.newTask" />
      </Button>
      <ModalComponent title={<Text mess="kanban.newTask" text />}>
        <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} projectId={projectId} />
      </ModalComponent>
    </>
  );
};
export default memo(CreateTask);
