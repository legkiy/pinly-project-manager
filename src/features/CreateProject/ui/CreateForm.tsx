import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateProjectDTO, createSchema } from '../model';
import { SubmitBtns, Text } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { routerService } from '@/shared/lib';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { createProjectByDto } from '../lib';
import CreateColumnsArray from './CreateColumnsArray';
import { useProjectStore } from '@/entities/Project';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateForm = ({ onCancel, onSubmit }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addProject } = useProjectStore();

  const methods = useForm<CreateProjectDTO>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      columns: [{ name: t('kanban.toDo') }, { name: t('kanban.inProgress') }, { name: t('kanban.done') }],
    },
  });

  const handleOnSubmit = (data: CreateProjectDTO) => {
    const newProject = createProjectByDto(data);
    addProject(newProject);
    onSubmit();
    navigate(routerService.project.slug(newProject.id));
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
        <CreateColumnsArray methods={methods} name="columns" defaultField={{ name: '' }} />
        <SubmitBtns onCancel={onCancel} />
      </Stack>
    </form>
  );
};
export default CreateForm;
