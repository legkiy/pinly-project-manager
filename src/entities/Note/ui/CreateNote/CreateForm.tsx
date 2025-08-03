import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Text } from '@/shared/ui';
import { useNotesStore } from '@/entities/Note';
import { CreateNoteDTO, createNoteSchema } from '../../model';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  projectId: string;
}
const CreateForm = ({ onSubmit, projectId }: Props) => {
  const createNote = useNotesStore((s) => s.createNote);

  const methods = useForm<CreateNoteDTO>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      projectId,
    },
  });

  const handleOnSubmit = (data: CreateNoteDTO) => {
    createNote(data);
    onSubmit();
  };

  return (
    <Form methods={methods} onSubmit={handleOnSubmit}>
      <Grid container>
        <Grid size={[12]}>
          <TextField
            fullWidth
            label={<Text mess="common.name" text />}
            {...methods.register('title')}
            error={!!methods.formState.errors.title}
            helperText={<Text mess={methods.formState.errors.title?.message ?? ''} text />}
          />
        </Grid>
        <Grid size={[12]}>
          <TextField
            fullWidth
            label={<Text mess="common.description" text />}
            {...methods.register('descriptions')}
            error={!!methods.formState.errors.descriptions}
            helperText={<Text mess={methods.formState.errors.descriptions?.message ?? ''} text />}
          />
        </Grid>
        <Grid size={[12]}>
          <Button type="submit">createNote</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CreateForm;
