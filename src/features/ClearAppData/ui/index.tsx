import { Button } from '@mui/material';
import { Text } from '@/shared/ui';

const ClearAppData = () => {
  return (
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
  );
};

export default ClearAppData;
