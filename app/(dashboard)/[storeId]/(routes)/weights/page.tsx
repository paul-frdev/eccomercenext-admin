import React from 'react';
import prismadb from '@/lib/prismadb';

import { SizeColumn } from '@/components/sizeColumns';
import { format } from 'date-fns';
import { WeightClient } from '@/components/weightsClient';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const weights = await prismadb.weight.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedWeights: SizeColumn[] = weights.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-0 mt-20'>
        <WeightClient data={formattedWeights} />
      </div>
    </div>
  );
};

export default SizesPage;
