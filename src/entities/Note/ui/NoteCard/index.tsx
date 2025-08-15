import { memo } from 'react';
import { Stack, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateNoteDTO, createNoteSchema, Note } from '../../model';
import { Form, Text } from '@/shared/ui';
import { useNotesStore } from '../../lib';
import { useDebounce } from '@/shared/lib';

interface Props extends Note {}

const NoteCard = (note: Props) => {
  const updateNote = useNotesStore((s) => s.updateNote);

  const methods = useForm<CreateNoteDTO>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      ...note,
    },
  });

  const values = methods.watch();

  const handleOnSubmit = (data: CreateNoteDTO) => {
    updateNote(note.id, () => data);
    methods.reset(data);
  };

  useDebounce(
    () => {
      if (!methods.formState.isDirty) {
        return; // Не отправляем при первом рендере
      }
      methods.handleSubmit(handleOnSubmit)();
    },
    400,
    [values]
  );

  return (
    <Form methods={methods} onSubmit={handleOnSubmit}>
      <Stack
        sx={({ shadows }) => ({
          bgcolor: '#dac66d',
          width: 270,
          boxShadow: shadows[4],
          p: 1,
          color: '#000',
        })}
        gap={2}
      >
        <TextField
          variant="standard"
          fullWidth
          label={<Text mess="common.name" text />}
          {...methods.register('title')}
          error={!!methods.formState.errors.title}
          helperText={<Text mess={methods.formState.errors.title?.message ?? ''} text />}
        />
        <TextField
          variant="standard"
          fullWidth
          label={<Text mess="common.description" text />}
          {...methods.register('descriptions')}
          error={!!methods.formState.errors.descriptions}
          helperText={<Text mess={methods.formState.errors.descriptions?.message ?? ''} text />}
          multiline
          minRows={4}
        />
      </Stack>
    </Form>
  );
};

export default memo(NoteCard);
