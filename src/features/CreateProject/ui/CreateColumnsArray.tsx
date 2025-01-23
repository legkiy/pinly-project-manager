import { Text } from '@/shared/ui';
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { ArrayPath, FieldArray, FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form';

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
        <Typography variant="h6">
          <Text mess="kanban.columns" />
        </Typography>
        <Button onClick={() => append(defaultField)} startIcon={<AddCircleRounded />} size="small">
          <Text mess="kanban.addColumn" />
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
          {...methods.register(`${name}.${index}.name` as any)}
          helperText={<Text mess={(methods.formState.errors[name] as any)?.[index]?.message ?? ''} />}
        />
      ))}
    </Stack>
  );
};
export default CreateColumnsArray;
