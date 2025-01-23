import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateProjectDTO, createSchema } from '../model';
import { SubmitBtns, Text } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProjectStore } from '@/entities/Project';
import { generateId } from '@/shared/lib';
import { Project } from '@/entities/Project';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateForm = ({ onCancel, onSubmit }: Props) => {
  const { addProject } = useProjectStore();
  const methods = useForm<CreateProjectDTO>({
    resolver: zodResolver(createSchema),
  });

  const handleOnSubmit = (data: CreateProjectDTO) => {
    const newProject: Project = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
    };
    addProject(newProject);
    onSubmit();
  };

  return (
    <form noValidate onSubmit={methods.handleSubmit(handleOnSubmit)}>
      <Stack
        gap={2}
        sx={{
          pt: 1,
        }}
      >
        <TextField
          fullWidth
          label={<Text mess="common.name" />}
          {...methods.register('name')}
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
