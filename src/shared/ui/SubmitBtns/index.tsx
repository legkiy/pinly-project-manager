import { Button, Stack, StackProps } from '@mui/material';
import { Text } from '@/shared/ui';

interface Props {
  onCancel: () => void;
  submitText?: string;
  sx?: StackProps['sx'];
}

const SubmitBtns = ({ onCancel, submitText = 'common.confirm', sx }: Props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'end', ...sx }}>
      <Button variant="outlined" onClick={onCancel} color="error">
        <Text mess="common.cancel" />
      </Button>
      <Button variant="contained" type="submit">
        <Text mess={submitText} />
      </Button>
    </Stack>
  );
};
export default SubmitBtns;
