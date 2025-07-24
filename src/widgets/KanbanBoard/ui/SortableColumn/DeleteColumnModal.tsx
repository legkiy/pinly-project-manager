import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { memo, useMemo, useState } from 'react';
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

  return (
    <ConfirmModal
      onConfirm={() => deleteColumn(columnId)}
      title={
        <>
          <Text mess="kanban.deleteColumn" text /> <strong>«{title}»</strong>
        </>
      }
      warningMess={
        <>
          <Text mess="common.deleteConfirm" text />

          <RadioGroup value={action} onChange={(_e, value) => setAction(value as OnDeleteAction)}>
            <Grid container>
              <Grid size={6}>
                <FormControlLabel control={<Radio />} label="move" value="move" />
                <FormControl size="small" disabled={action !== 'move'}>
                  <InputLabel>
                    <Text mess="kanban.toColumn" />
                  </InputLabel>
                  <Select
                    label={<Text mess="kanban.toColumn" text />}
                    value={selectColumnId}
                    onChange={(e) => setSelectColumnId(e.target.value)}
                  >
                    {columnsList.map((col) => (
                      <MenuItem key={col.id} value={col.id}>
                        {col.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={[12]}>
                <FormControlLabel control={<Radio />} label="delete" value="delete" />
              </Grid>
            </Grid>
          </RadioGroup>
        </>
      }
    >
      <Button size="small" variant="square" color="error">
        <DeleteRounded fontSize="small" />
      </Button>
    </ConfirmModal>
  );
};
export default memo(DeleteColumnModal);
