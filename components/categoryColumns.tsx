'use client'

import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import { CategoriesCellAction } from './categoryCellAction';

export interface CategoryColumn {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}
export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoriesCellAction data={row.original} />
  },
]
