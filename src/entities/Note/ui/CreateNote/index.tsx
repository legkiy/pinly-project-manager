import { CreateNewItem, Modal, Text } from '@/shared/ui';
import CreateForm from './CreateForm';

interface Props {
  projectId: string;
}
const CreateNote = ({ projectId }: Props) => {
  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  return (
    <>
      <CreateNewItem onClick={onOpenModal} titleKey={['common.add', ' ', 'note.title']} variant="button" />
      <Modal.Component
        title={<Text mess={['common.new', ' ', 'note.title']} text />}
        open={modalState}
        onClose={onCloseModal}
      >
        <CreateForm onCancel={onCloseModal} onSubmit={onCloseModal} projectId={projectId} />
      </Modal.Component>
    </>
  );
};

export default CreateNote;
