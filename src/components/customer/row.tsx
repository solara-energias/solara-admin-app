'use client';

import { Customer } from '@solara/api';
import Copy from '../copy';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Label } from '../ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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
          <HoverCardContent align="start" className="w-fit max-w-lg space-y-2">
            <div className="group">
              <Label>Endereço</Label>
              <Copy text={address}>
                <p className="text-neutral-700">{address}</p>
              </Copy>
            </div>
            <div className="group">
              <Label>Consultor</Label>
              <Copy text={consultant}>
                <p className="text-neutral-700">{consultant}</p>
              </Copy>
            </div>
            <div>
              <Label>Compras</Label>
              <Table className="max-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shopping.map((shop) => (
                    <TableRow
                      className="text-neutral-700"
                      key={shop.boughtTimestamp}
                    >
                      <TableCell className="w-full">
                        <p>
                          {shop.description} ×{shop.quantity}
                        </p>
                      </TableCell>
                      <TableCell className="shrink-0 whitespace-nowrap w-fit font-medium">
                        {'R$ ' +
                          shop.cost.toLocaleString('pt-BR', {
                            currency: 'BRL',
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
