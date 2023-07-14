'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ProductCellAction } from './productCellAction';

export type ProductColumnProps = {
  id: string;
  name: string;
  description: string;
  options: string;
  priceDiscount: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  isDiscount: boolean;
  createdAt: string;
};

export const productsColumn: ColumnDef<ProductColumnProps>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'options',
    header: 'Options',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'isDiscount',
    header: 'Discount',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'priceDiscount',
    header: 'Discount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.color}
        <span
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.color }}
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
    cell: ({ row }) => <ProductCellAction data={row.original} />,
  },
];
