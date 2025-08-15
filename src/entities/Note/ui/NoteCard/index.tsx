import { memo } from 'react';
import { Divider, Stack, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateNoteDTO, createNoteSchema, Note } from '../../model';
import { Form, Text } from '@/shared/ui';
import { useNotesStore } from '../../lib';
import { useDebounce } from '@/shared/lib';

interface Props extends Note {}

const NoteCard = (note: Props) => {
  const { t } = useTranslation();
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
        gap={1}
      >
        <TextField
          variant="standard"
          fullWidth
          placeholder={t('common.name')}
          {...methods.register('title')}
          error={!!methods.formState.errors.title}
          helperText={<Text mess={methods.formState.errors.title?.message ?? ''} text />}
        />
        <Divider
          sx={{
            borderColor: '#000',
          }}
        />
        <TextField
          variant="standard"
          fullWidth
          placeholder={t('common.description')}
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
