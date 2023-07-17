'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heading } from './heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { DataTable } from './dataTable';
import { ApiList } from './apiList';
import { WeightColumn, weightColumns } from './weightColumns';

interface WeightClientProps {
  data: WeightColumn[];
}
export const WeightClient: FC<WeightClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Weights (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/weights/new`)}>
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={weightColumns} data={data} />
      <Heading title='API' description='API calls for weights' />
      <Separator />
      <ApiList entityIdName='weightId' entityName='weights' />
    </>
  );
};
