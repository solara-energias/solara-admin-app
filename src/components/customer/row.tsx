'use client';

import { Customer } from '@solara/api';
import Copy from '../copy';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { TableCell, TableRow } from '../ui/table';

interface CustomerRowProps {
  customer: Customer;
}

function CustomerRow({ customer }: CustomerRowProps) {
  const { name, phone } = customer;
  const kwp = customer.kwp?.toLocaleString('pt-BR') || '-';
  const brand = customer.brand || '-';

  return (
    <TableRow>
      <TableCell>
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <p className="border-neutral-200 w-fit hover:border-neutral-300 font-medium transition-all border-b-2">
              {name}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>Howdy</HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell className="group">
        <Copy text={phone}>{phone}</Copy>
      </TableCell>
      <TableCell className="group">
        <Copy text={kwp}>{kwp}</Copy>
      </TableCell>
      <TableCell className="text-right">{brand}</TableCell>
    </TableRow>
  );
}

export default CustomerRow;
