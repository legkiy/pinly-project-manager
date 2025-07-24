import { Button } from '@mui/material';
import { Modal, Text } from '@/shared/ui';
import CreateForm from './CreateForm';

const CreateProject = () => {
  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  return (
    <>
      <Button size="medium" sx={{ height: 'fit-content' }} onClick={onOpenModal}>
        <Text mess={['common.add', ' ', 'project.title']} text />
      </Button>
      <Modal.Component
        title={<Text mess={['common.new', ' ', 'project.title']} text />}
        open={modalState}
        onClose={onCloseModal}
      >
        <CreateForm onCancel={onCloseModal} onSubmit={onCloseModal} />
      </Modal.Component>
    </>
  );
};
export default CreateProject;
