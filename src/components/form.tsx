'use client';

import { useSearch } from '@app/context/search';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FormValues {
  customer: string;
}

function Form() {
  const { setSearch, isLoading } = useSearch();
  const { register, handleSubmit } = useForm<FormValues>({
    shouldUseNativeValidation: true,
  });

  const onSubmit = handleSubmit(({ customer }) => {
    setSearch(customer);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center w-full max-w-md gap-2"
    >
      <Input
        className="w-full"
        placeholder="Nome do cliente..."
        required
        {...register('customer', { required: true })}
      />
      <Button disabled={isLoading} type="submit">
        {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-1" />}
        Pesquisar
      </Button>
    </form>
  );
}

export default Form;
