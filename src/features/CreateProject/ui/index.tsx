import { Text } from '@/shared/ui';
import { Button } from '@mui/material';
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
        <Text mess="common.add" /> <Text mess="project" />
      </Button>
      <ModalComponent
        title={
          <>
            <Text mess="common.new" /> <Text mess="project" />
          </>
        }
      >
        <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} />
      </ModalComponent>
    </>
  );
};
export default CreateProject;
