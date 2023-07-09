'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColorCellAction } from './colorCellAction';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const colorColumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.value}
        <span
          className='h-5 w-6 rounded-full border'
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ColorCellAction data={row.original} />,
  },
];
