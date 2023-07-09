'use client';

import React, { FC } from 'react';
import { Heading } from './heading';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './dataTable';
import { ApiList } from './apiList';
import { ProductColumnProps, productsColumn } from './productColumn';

interface ProductClientProps {
  data: ProductColumnProps[];
}
export const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={productsColumn} data={data} />
      <Heading title='API' description='API calls for Products' />
      <Separator />
      <ApiList entityIdName='productId' entityName='products' />
    </>
  );
};
