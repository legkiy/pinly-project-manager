import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Text from '../Text';
import Form from '../Form';
import Modal from '../Modal';

interface ConfirmModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onConfirm: () => void;
  warningMess?: React.ReactNode;
  confirmValue?: string;
}

const ConfirmModal = ({ children, title, onConfirm, warningMess, confirmValue = 'delete' }: ConfirmModalProps) => {
  const methods = useForm({
    resolver: zodResolver(
      z.object({
        value: z.literal(confirmValue),
      })
    ),
  });

  const { modalState, onCloseModal, onOpenModal } = Modal.handlers();

  const handleConfirm = ({ value }: { value: string }) => {
    if (value === confirmValue) {
      onConfirm();
      onCloseModal();
      return;
    } else {
      return;
    }
  };
  return (
    <>
      <div onClick={onOpenModal}>{children}</div>
      <Modal.Component open={modalState} onClose={onCloseModal} title={title}>
        <Form methods={methods} onSubmit={handleConfirm}>
          {warningMess}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
              }}
            >
              <Text mess="common.deleteConfirm" text /> <strong>{confirmValue}</strong>
            </Typography>
            <TextField fullWidth {...methods.register('value')} error={!!methods.formState.errors.value} />
          </Box>
          <Stack
            direction="row"
            sx={{
              pt: 2,
              gap: 1,
              justifyContent: 'end',
            }}
          >
            <Button onClick={onCloseModal} variant="outlined" color="error">
              <Text mess="common.cancel" text />
            </Button>
            <Button type="submit" color="success">
              <Text mess="common.confirm" text />
            </Button>
          </Stack>
        </Form>
      </Modal.Component>
    </>
  );
};

export default ConfirmModal;
