import { Button, ClickAwayListener, IconButton, Stack, TextField } from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Text } from '@/shared/ui';
import { useState } from 'react';
import { useProjectStore } from '@/entities/Project';

interface Props {
  title: string;
  columnId: string;
}

const ColumnTitle = ({ title, columnId }: Props) => {
  const deleteColumn = useProjectStore((s) => s.deleteColumn);
  const updateColumn = useProjectStore((s) => s.updateColumn);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const handleSaveTitle = () => {
    if (editMode) {
      updateColumn(columnId, newTitle);
      setEditMode(false);
      return;
    }
    setEditMode((prev) => !prev);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mt: 1,
      }}
      gap={1}
    >
      {editMode ? (
        <ClickAwayListener onClickAway={() => setEditMode(false)}>
          <TextField
            defaultValue={title}
            size="small"
            onChange={(event) => setNewTitle(event.target.value.trim())}
            fullWidth
            autoFocus
          />
        </ClickAwayListener>
      ) : (
        <Text mess={title} variant="h5" />
      )}
      <Stack direction="row" gap={0.5}>
        <IconButton onClick={handleSaveTitle} size="small" color={editMode ? 'success' : 'default'}>
          {editMode ? <CheckRoundedIcon fontSize="small" /> : <EditRoundedIcon fontSize="small" />}
        </IconButton>
        {!editMode && (
          <Button onClick={() => deleteColumn(columnId)} size="small" variant="square" color="error">
            <DeleteRounded fontSize="small" />
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
export default ColumnTitle;
