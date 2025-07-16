import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export interface Props<T extends FieldValues> {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
  onSubmit: (data: T) => void;
}

const Form = <T extends FieldValues>({ methods, children, onSubmit }: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, (errors) => console.warn('FORM VALIDATING ERROR', errors))}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
