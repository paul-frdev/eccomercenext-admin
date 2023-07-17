'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { Heading } from './heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from './dataTable';
import { ApiList } from './apiList';
import { categoryColumns, CategoryColumn } from './categoryColumns';

interface CategoryClientProps {
  data: CategoryColumn[];
}
export const CategoryClient: FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log('data', data);
  
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={categoryColumns} data={data} />
      <Heading title='API' description='API calls for Categories' />
      <Separator />
      <ApiList entityIdName='CategoryId' entityName='categories' />
    </>
  );
};
