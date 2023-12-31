import React from 'react';
import prismadb from '@/lib/prismadb';

import { CategoryClient } from '@/components/categoryClient';
import { CategoryColumn } from '@/components/categoryColumns';
import { format } from 'date-fns';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    imageUrl: item.imageUrl.length ? true : false,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-0 mt-20'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
