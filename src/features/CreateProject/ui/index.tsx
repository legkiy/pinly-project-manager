import { Button } from '@mui/material';
import { Text } from '@/shared/ui';
import CreateForm from './CreateForm';
import { useModal } from '@/shared/lib';

const CreateProject = () => {
  const { ModalComponent, ...modal } = useModal();

  return (
    <>
      <Button
        size="medium"
        sx={{
          height: 'fit-content',
        }}
        onClick={modal.onOpen}
      >
        <Text mess={['common.add', ' ', 'project.title']} text />
      </Button>
      <ModalComponent title={<Text mess={['common.new', ' ', 'project.title']} text />}>
        <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} />
      </ModalComponent>
    </>
  );
};
export default CreateProject;
