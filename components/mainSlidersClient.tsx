'use client';

import React, { FC } from 'react';
import { Heading } from './heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './dataTable';
import { ApiList } from './apiList';
import { MainSliderColumn, mainSliderColumns } from './mainSliderColumns';

interface MainSliderClientProps {
  data: MainSliderColumn[];
}
export const MainSliderClient: FC<MainSliderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Main Slider (${data.length})`}
          description='Manage main sliders for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/main-sliders/new`)}
        >
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={mainSliderColumns} data={data} />
      <Heading title='API' description='API calls for Main Sliders' />
      <Separator />
      <ApiList entityIdName='mainsliderId' entityName='main-sliders' />
    </>
  );
};
