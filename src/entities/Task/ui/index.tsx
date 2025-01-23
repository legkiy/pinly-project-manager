import { Task } from '@/shared/models';
import { DropdownMenu } from '@/shared/ui';
import { DeleteRounded, MoreVert } from '@mui/icons-material';
import { Card, CardContent, CardHeader, IconButton, MenuItem } from '@mui/material';
import { memo } from 'react';

interface Props extends Task {
  onDelete: (id: string) => void;
}

const TaskCard = ({ id, name, description, onDelete }: Props) => {
  return (
    <Card elevation={1}>
      <CardHeader
        title={name}
        action={
          <DropdownMenu
            renderBtn={(onOpen) => (
              <IconButton onClick={onOpen}>
                <MoreVert />
              </IconButton>
            )}
          >
            {(onClose) => (
              <>
                <MenuItem
                  onClick={() => {
                    onClose();
                    onDelete(id);
                  }}
                >
                  <DeleteRounded />
                </MenuItem>
              </>
            )}
          </DropdownMenu>
        }
      />
      <CardContent>{description}</CardContent>
    </Card>
  );
};
export default memo(TaskCard);
