'use client';

import React, { FC } from 'react';
import { Heading } from './heading';
import { ColorColumn, colorColumns } from './colorColumns';
import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import { DataTable } from './dataTable';
import { ApiList } from './apiList';

interface ColorsClientProps {
  data: ColorColumn[];
}
export const ColorsClient: FC<ColorsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors (${data.length})`}
          description='Manage colors for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={colorColumns} data={data} />
      <Heading title='API' description='API calls for sizes' />
      <Separator />
      <ApiList entityIdName='colorId' entityName='colors' />
    </>
  );
};
