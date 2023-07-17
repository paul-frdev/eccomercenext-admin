'use client';

import { ColumnDef } from '@tanstack/react-table';
import { WeightCellAction } from './weightCellAction';

export type WeightColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const weightColumns: ColumnDef<WeightColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <WeightCellAction data={row.original} />,
  },
];
