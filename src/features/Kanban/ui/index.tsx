import { Button, Stack } from '@mui/material';
import Column from './Column';
import { Text } from '@/shared/ui';
import AddRounded from '@mui/icons-material/AddRounded';

const Kanban = () => {
  const createNewColumn = () => {};
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        outline: '1px solid black',
        overflowY: 'hidden',
        overflowX: 'auto',
      }}
    >
      <Column title={<Text mess="kanban.toDo" />} />
      <Column title={<Text mess="kanban.inProgress" />} />
      <Column title={<Text mess="kanban.done" />} />
      <Button startIcon={<AddRounded />} onClick={createNewColumn}>
        <Text mess="Add" />
      </Button>
    </Stack>
  );
};
export default Kanban;
