import { Controller, useForm } from 'react-hook-form';
import { createSchema, CreateTaskDTO } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Form, SubmitBtns, Text } from '@/shared/ui';
import { useProjectStore } from '@/entities/Project';
import { memo, useMemo } from 'react';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  projectId: string;
}

const CreateForm = ({ onCancel, onSubmit, projectId }: Props) => {
  const columns = useProjectStore((s) => s.columns);
  const createTask = useProjectStore((s) => s.createTask);

  const columnsList = useMemo(
    () =>
      Object.entries(columns)
        .map(([_columnId, column]) => column)
        .filter((col) => col.projectId === projectId),
    []
  );

  const methods = useForm<CreateTaskDTO>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      columnId: columnsList[0].id,
    },
  });

  const handleOnSubmit = (data: CreateTaskDTO) => {
    createTask(data);
    onSubmit();
  };

  return (
    <Form methods={methods} onSubmit={handleOnSubmit}>
      <Stack gap={2} pt={1}>
        <TextField
          fullWidth
          label={<Text mess="common.name" text />}
          {...methods.register('title')}
          error={!!methods.formState.errors.title}
          helperText={<Text mess={methods.formState.errors.title?.message ?? ''} text />}
        />
        <TextField
          fullWidth
          label={<Text mess="common.description" text />}
          {...methods.register('description')}
          multiline
          rows={3}
          error={!!methods.formState.errors.description}
          helperText={<Text mess={methods.formState.errors.description?.message ?? ''} text />}
        />
        <Controller
          name="columnId"
          control={methods.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>
                <Text mess="toColumn" />
              </InputLabel>
              <Select onChange={field.onChange} label={<Text mess="toColumn" text />} value={field.value}>
                {columnsList.map((col) => (
                  <MenuItem key={col.id} value={col.id}>
                    {col.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <SubmitBtns onCancel={onCancel} />
      </Stack>
    </Form>
  );
};
export default memo(CreateForm);
