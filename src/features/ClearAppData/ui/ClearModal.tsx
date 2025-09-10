import { useState } from 'react';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import { ConfirmModal, Text } from '@/shared/ui';
import { clearAppData } from '../lib';

interface Props {
  children: React.ReactNode;
}

const ClearModal = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await clearAppData();
    } catch (error) {
      console.log('Clear Store Error: ', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} onClick={() => {}} open={isLoading}>
        <CircularProgress />
      </Backdrop>

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
    </>
  );
};

export default ClearModal;
