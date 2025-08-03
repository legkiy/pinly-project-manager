import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { Form, SubmitBtns, Text } from '@/shared/ui';
import CreateColumnsArray from './CreateColumnsArray';
import { useProjectStore } from '@/entities/Project';
import { routerService } from '@/shared/lib';
import { CreateProjectDTO, projectSchema } from '../../model';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateForm = ({ onCancel, onSubmit }: Props) => {
  const defaultColumns = [
    { title: 'kanban.queue', id: 'column-' + crypto.randomUUID() },
    { title: 'kanban.inProgress', id: 'column-' + crypto.randomUUID() },
    { title: 'kanban.done', id: 'column-' + crypto.randomUUID() },
  ];

  const navigate = useNavigate();
  const { createProject } = useProjectStore();

  const methods = useForm<CreateProjectDTO>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      columns: defaultColumns,
    },
  });

  const handleOnSubmit = (data: CreateProjectDTO) => {
    const newProject = createProject(data);
    onSubmit();
    navigate(routerService.projects.id(newProject.id));
  };

  return (
    <Form methods={methods} onSubmit={handleOnSubmit}>
      <Stack
        gap={2}
        sx={{
          pt: 1,
        }}
      >
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
          minRows={3}
        />
        <CreateColumnsArray
          methods={methods}
          name="columns"
          defaultField={{ title: '', id: 'column-' + crypto.randomUUID() }}
        />
        <SubmitBtns onCancel={onCancel} />
      </Stack>
    </Form>
  );
};
export default CreateForm;
