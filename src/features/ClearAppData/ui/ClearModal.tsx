import { Stack } from '@mui/material';
import { ConfirmModal, Text } from '@/shared/ui';

interface Props {
  children: React.ReactNode;
}

const ClearModal = ({ children }: Props) => {
  const handleOnDeleteConfirm = () => {};
  return (
    <ConfirmModal
      onConfirm={handleOnDeleteConfirm}
      title={<Text mess="settings.clear.title" />}
      warningMess={
        <Stack gap={2}>
          <Text mess="settings.clear.confirm" />
        </Stack>
      }
    >
      {children}
    </ConfirmModal>
  );
};

export default ClearModal;
