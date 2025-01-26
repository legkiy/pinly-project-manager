import { useModal } from '@/shared/lib';
import { Text } from '@/shared/ui';
import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import CreateForm from './CreateForm';

interface Props {
  projectId: string;
  columnId: string;
}

const CreateTask = ({ columnId, projectId }: Props) => {
  const { ModalComponent, ...modal } = useModal();

  return (
    <>
      <Button startIcon={<AddCircleRounded />} onClick={modal.toggleModal}>
        <Text mess="kanban.newTask" />
      </Button>
      <ModalComponent title={<Text mess="kanban.newTask" />}>
        <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} columnId={columnId} projectId={projectId} />
      </ModalComponent>
    </>
  );
};
export default CreateTask;
