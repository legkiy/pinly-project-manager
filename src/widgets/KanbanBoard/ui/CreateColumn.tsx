import { CreateNewItem } from '@/shared/ui';
import { COLUMN_WIDTH } from '../model';
import { useState } from 'react';
import { Box, ClickAwayListener, IconButton, Paper, TextField } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useProjectStore } from '@/entities/Project';

interface Props {
  projectId: string;
}

const CreateColumn = ({ projectId }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const createColumn = useProjectStore((s) => s.createColumn);

  const handleSaveTitle = () => {
    if (open) {
      createColumn(projectId, title);
      setOpen(false);
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: COLUMN_WIDTH,
      }}
    >
      {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={2}
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <TextField
              value={title}
              size="small"
              onChange={(event) => setTitle(event.target.value.trim())}
              fullWidth
              autoFocus
            />
            <IconButton onClick={handleSaveTitle} size="small" color="success" sx={{}}>
              <CheckRoundedIcon fontSize="small" />
            </IconButton>
          </Paper>
        </ClickAwayListener>
      ) : (
        <CreateNewItem
          titleKey="kanban.addColumn"
          onClick={() => setOpen(true)}
          sx={{
            height: 200,
          }}
        />
      )}
    </Box>
  );
};
export default CreateColumn;
