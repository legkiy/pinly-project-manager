import { Text } from '@/shared/ui';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CreateForm from './CreateForm';
import { useModal } from '@/shared/lib';

const CreateProject = () => {
  const modal = useModal();

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
      <Dialog open={modal.open} onClose={modal.onClose} fullWidth>
        <DialogTitle>
          <Text mess="common.new" /> <Text mess="project" />
        </DialogTitle>
        <DialogContent>
          <CreateForm onCancel={modal.onClose} onSubmit={modal.onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateProject;
