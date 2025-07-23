import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Text from '../Text';
import Form from '../Form';

interface ConfirmModalProps {
  titleKey: string;
  children: React.ReactNode;
  onConfirm: () => void;
  warningMess?: React.ReactNode;
  confirmValue?: string;
}

const ConfirmModal = ({ children, titleKey, onConfirm, warningMess, confirmValue = 'delete' }: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  };

  const methods = useForm({
    resolver: zodResolver(
      z.object({
        value: z.literal(confirmValue),
      })
    ),
  });

  const handleConfirm = ({ value }: { value: string }) => {
    if (value === confirmValue) {
      onConfirm();
      return;
    } else {
      return;
    }
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <Form methods={methods} onSubmit={handleConfirm}>
          <DialogTitle>
            <Text mess={titleKey} text />
          </DialogTitle>
          <DialogContent>
            {warningMess}
            <Box>
              <Typography variant="body1">
                <Text mess="common.deleteConfirm" text /> <strong>{confirmValue}</strong>
              </Typography>
              <TextField fullWidth {...methods.register('value')} error={!!methods.formState.errors.value} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">
              <Text mess="common.cancel" text />
            </Button>
            <Button type="submit" color="success">
              <Text mess="common.confirm" text />
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
