import React from 'react';
import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import { MainSliderColumn } from '@/components/mainSliderColumns';
import { MainSliderClient } from '@/components/mainSlidersClient';

const MainSlidersPage = async ({ params }: { params: { storeId: string } }) => {
  const mainSliders = await prismadb.mainSlider.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      images: true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedMainSliders: MainSliderColumn[] = mainSliders.map((item) => ({
    id: item.id,
    label: item.label,
    images: item.images.length,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <MainSliderClient data={formattedMainSliders} />
      </div>
    </div>
  );
};

export default MainSlidersPage;
