import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { useMemo, useState } from 'react';
import { ConfirmModal, Text } from '@/shared/ui';
import { useProjectStore } from '@/entities/Project';

interface Props {
  title: string;
  columnId: string;
}

type OnDeleteAction = 'delete' | 'move';

const DeleteColumnModal = ({ title, columnId }: Props) => {
  const columns = useProjectStore((s) => s.columns);
  const deleteColumn = useProjectStore((s) => s.deleteColumn);
  const moveTask = useProjectStore((e) => e.moveTask);

  const [action, setAction] = useState<OnDeleteAction>('delete');

  const columnsList = useMemo(
    () =>
      Object.entries(columns)
        .map(([_columnId, column]) => column)
        .filter((col) => col.projectId === columns[columnId].projectId)
        .filter((el) => el.id !== columnId),
    []
  );

  const [selectColumnId, setSelectColumnId] = useState<string>(columnsList[0]?.id || '');
  const handleDelete = () => {
    if (action === 'move') {
      moveTask(columns[columnId].taskIds, selectColumnId);
    }
    return deleteColumn(columnId);
  };

  return (
    <ConfirmModal
      onConfirm={handleDelete}
      title={
        <>
          <Text mess="kanban.deleteColumn" text /> <strong>«{title}»</strong>?
        </>
      }
      warningMess={
        columns[columnId].taskIds.length > 0 && (
          <Stack gap={2}>
            <Text mess={['kanban.whatToBoTasks', ':']} />
            <RadioGroup
              value={action}
              onChange={(_e, value) => setAction(value as OnDeleteAction)}
              sx={{
                gap: 0.4,
              }}
            >
              <Tooltip
                title={<Text mess="kanban.noAvailableColumns" />}
                disableInteractive={columnsList.length > 0}
                placement="top"
                disableHoverListener={columnsList.length > 0}
              >
                <Stack direction="row" width="fit-content">
                  <FormControlLabel
                    control={<Radio />}
                    label={<Text mess="common.move" text />}
                    value="move"
                    disabled={columnsList.length < 1}
                  />
                  <FormControl size="small" disabled={action !== 'move'}>
                    <InputLabel>
                      <Text mess="kanban.toColumn" />
                    </InputLabel>
                    <Select
                      label={<Text mess="kanban.toColumn" text />}
                      value={selectColumnId}
                      onChange={(e) => setSelectColumnId(e.target.value)}
                      sx={{
                        minWidth: [100, 200],
                      }}
                    >
                      {columnsList.map((col) => (
                        <MenuItem key={col.id} value={col.id}>
                          {col.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Tooltip>
              <FormControlLabel
                control={<Radio color="error" />}
                label={<Text mess="common.delete" text />}
                value="delete"
              />
            </RadioGroup>
          </Stack>
        )
      }
    >
      <Button size="small" variant="square" color="error">
        <DeleteRounded fontSize="small" />
      </Button>
    </ConfirmModal>
  );
};
export default DeleteColumnModal;
