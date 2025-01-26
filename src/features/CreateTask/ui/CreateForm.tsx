import { useForm } from 'react-hook-form';
import { createSchema, CreateTaskDTO } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField } from '@mui/material';
import { SubmitBtns, Text } from '@/shared/ui';
import { useTaskStore } from '@/entities/Task';
import { createTaskByDto } from '../lib';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  projectId: string;
  columnId: string;
}

const CreateForm = ({ onCancel, onSubmit, columnId, projectId }: Props) => {
  const { addTask } = useTaskStore();

  const methods = useForm<CreateTaskDTO>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      projectId: projectId,
      columnId: columnId,
    },
  });

  const handleOnSubmit = (data: CreateTaskDTO) => {
    addTask(createTaskByDto(data));
    onSubmit();
  };
  return (
    <form noValidate onSubmit={methods.handleSubmit(handleOnSubmit)}>
      <Stack gap={2} pt={1}>
        <TextField
          fullWidth
          label={<Text mess="common.name" />}
          {...methods.register('name')}
          error={!!methods.formState.errors.name}
          helperText={<Text mess={methods.formState.errors.name?.message ?? ''} />}
        />
        <TextField
          fullWidth
          label={<Text mess="common.description" />}
          {...methods.register('description')}
          multiline
          rows={3}
        />
        <SubmitBtns onCancel={onCancel} />
      </Stack>
    </form>
  );
};
export default CreateForm;
