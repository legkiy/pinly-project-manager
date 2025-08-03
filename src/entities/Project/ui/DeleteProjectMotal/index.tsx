import { Button, Stack } from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { ConfirmModal, Text } from '@/shared/ui';
import { useProjectStore } from '../../lib';

interface Props {
  projectId: string;
  projectName: string;
}
const DeleteProjectModal = ({ projectId, projectName }: Props) => {
  const deleteProject = useProjectStore((e) => e.deleteProject);

  const handleDelete = () => {
    deleteProject(projectId);
  };

  return (
    <ConfirmModal
      onConfirm={handleDelete}
      title={
        <>
          <Text mess="project.deleteConfirm" text /> <strong>«{projectName}»</strong>?
        </>
      }
      warningMess={
        <Stack gap={2}>
          <Text mess={['project.deleteWarn', '!']} />
        </Stack>
      }
    >
      <Button size="small" variant="square" color="error">
        <DeleteRounded fontSize="small" />
      </Button>
    </ConfirmModal>
  );
};

export default DeleteProjectModal;
