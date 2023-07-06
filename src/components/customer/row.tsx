'use client';

import { Customer } from '@solara/api';
import Copy from '../copy';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { TableCell, TableRow } from '../ui/table';

interface CustomerRowProps {
  customer: Customer;
}

function CustomerRow({ customer }: CustomerRowProps) {
  const { name, phone, address, consultant, shopping } = customer;
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
          <HoverCardContent align="start" className="w-fit space-y-2">
            <div>
              <Label>Endereço</Label>
              <p className="text-neutral-700">{address}</p>
            </div>
            <div>
              <Label>Consultor</Label>
              <p className="text-neutral-700">{consultant}</p>
            </div>
            <div>
              <Label>Compras</Label>
              {shopping.map((shop) => (
                <div
                  className="text-neutral-700 flex items-center"
                  key={shop.boughtTimestamp}
                >
                  <p className="font-medium">
                    R${' '}
                    {shop.cost.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-400 h-4 mx-1"
                  />
                  <p>
                    {shop.description} ×{shop.quantity}
                  </p>
                </div>
              ))}
            </div>
          </HoverCardContent>
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
