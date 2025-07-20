import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import { ArrayPath, FieldArray, FieldValues, Path, useFieldArray, UseFormReturn } from 'react-hook-form';
import { Text } from '@/shared/ui';

interface Props<T extends FieldValues> {
  name: ArrayPath<T>;
  methods: UseFormReturn<T>;
  defaultField: FieldArray<T, ArrayPath<T>>;
}

const CreateColumnsArray = <T extends FieldValues>({ methods, name, defaultField }: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name,
  });

  return (
    <Stack spacing={2} mt={2}>
      <Stack direction="row" justifyContent="space-between">
        <Text mess="kanban.columns" variant="h6" />
        <Button onClick={() => append(defaultField)} startIcon={<AddCircleRounded />} size="small">
          <Text mess="kanban.addColumn" text />
        </Button>
      </Stack>
      {fields.map((field, index) => (
        <TextField
          key={field.id}
          size="small"
          slotProps={{
            input: {
              sx: {
                pr: 1,
              },
              endAdornment: (
                <IconButton onClick={() => remove(index)}>
                  <RemoveCircleRounded />
                </IconButton>
              ),
            },
          }}
          fullWidth
          label={`Column ${index + 1}`}
          {...methods.register(`${name}.${index}.title` as Path<T>)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error={!!(methods.formState.errors[name] as any)?.[index]}
          helperText={
            <Text
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              mess={(methods.formState.errors[name] as any)?.[index]?.name?.message ?? ''}
              text
            />
          }
        />
      ))}
    </Stack>
  );
};
export default CreateColumnsArray;
