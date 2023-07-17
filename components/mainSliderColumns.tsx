'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MainSlidersCellAction } from './mainSlidersCellAction';

export type MainSliderColumn = {
  id: string;
  images: number;
  title: string;
  createdAt: string;
};

export const mainSliderColumns: ColumnDef<MainSliderColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'images',
    header: 'Images',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <MainSlidersCellAction data={row.original} />,
  },
];
