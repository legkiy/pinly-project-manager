import { ClickAwayListener, IconButton, Stack, TextField } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useState } from 'react';
import { Text } from '@/shared/ui';
import { useProjectStore } from '@/entities/Project';
import DeleteColumnModal from './DeleteColumnModal';

interface Props {
  title: string;
  columnId: string;
}

const ColumnTitle = ({ title, columnId }: Props) => {
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
        my: 1,
      }}
      gap={1}
    >
      {editMode ? (
        <ClickAwayListener onClickAway={() => setEditMode(false)}>
          <TextField
            defaultValue={title}
            onChange={(event) => setNewTitle(event.target.value.trim())}
            fullWidth
            autoFocus
            slotProps={{
              input: {
                sx: ({ typography }) => ({
                  p: 0,
                  fontSize: typography.h5.fontSize,
                }),
              },
              htmlInput: {
                sx: {
                  p: 1,
                },
              },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Text mess={title} variant="h5" />
      )}
      <Stack direction="row" gap={0.5}>
        <IconButton onClick={handleSaveTitle} size="small" color={editMode ? 'success' : 'default'}>
          {editMode ? <CheckRoundedIcon fontSize="small" /> : <EditRoundedIcon fontSize="small" />}
        </IconButton>
        {!editMode && <DeleteColumnModal title={title} columnId={columnId} />}
      </Stack>
    </Stack>
  );
};
export default ColumnTitle;
