import { Button } from '@mui/material';
import { Text } from '@/shared/ui';
import ClearModal from './ClearModal';

const ClearAppData = () => {
  return (
    <ClearModal>
      <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: 'none',
          maxWidth: 'fit-content',
        }}
      >
        <Text mess="settings.clear.title" />
      </Button>
    </ClearModal>
  );
};

export default ClearAppData;
