import { CreateNewItem, Modal, Text } from '@/shared/ui';
import CreateForm from './CreateForm';

const CreateProject = () => {
  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  return (
    <>
      <CreateNewItem onClick={onOpenModal} titleKey={['common.add', ' ', 'project.title']} type="button" />
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
