'use client';

import { useSearch } from '@app/context/search';
import { useTauri } from '@app/context/tauri';
import { fetchCustomers } from '@app/lib/customers';
import { Customer } from '@solara/api';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import CustomerRow from './row';

function CustomerTable() {
  const { http } = useTauri();
  const { search, isLoading, setIsLoading } = useSearch();
  const [customers, setCustomers] = useState<Customer[] | undefined>([]);

  useEffect(() => {
    setCustomers([]);

    if (!search) {
      return;
    }

    setIsLoading(true);

    fetchCustomers(search, http)
      .then(setCustomers)
      .then(() => setIsLoading(false));
  }, [search]);

  if (!customers) {
    return (
      <p className="text-neutral-500 text-sm">Nenhum cliente encontrado.</p>
    );
  }

  if (isLoading) {
    return (
      <div className="text-neutral-500 flex items-center gap-1 text-sm">
        <Loader2 className="animate-spin w-4 h-4" />
        <p>Carregando...</p>
      </div>
    );
  }

  if (!customers.length) {
    return;
  }

  return (
    <Table className="w-full">
      <TableCaption>Clientes encontrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>KWP</TableHead>
          <TableHead className="text-right">Marca</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <CustomerRow key={customer.name} customer={customer} />
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;
