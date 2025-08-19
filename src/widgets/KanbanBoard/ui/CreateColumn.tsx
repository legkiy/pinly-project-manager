import { useLayoutEffect, useState } from 'react';
import { Box, ClickAwayListener, IconButton, Paper, TextField } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { COLUMN_WIDTH } from '../model';
import { CreateNewItem } from '@/shared/ui';
import { useProjectStore } from '@/entities/Project';

interface Props {
  projectId: string;
}

const CreateColumn = ({ projectId }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const createColumn = useProjectStore((s) => s.createColumn);

  const handleSaveTitle = () => {
    createColumn(projectId, title);
    setOpen(false);
  };
  useLayoutEffect(() => {
    setTitle('');
  }, [open]);

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
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault(); // чтобы не было переноса строки
                  handleSaveTitle();
                }
              }}
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
