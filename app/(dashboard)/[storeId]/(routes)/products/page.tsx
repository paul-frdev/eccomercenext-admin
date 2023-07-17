import React from 'react';
import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import { formattedPrice } from '@/lib/utils';
import { ProductClient } from '@/components/productsClient';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: any[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description.length ? true : false,
    options: item.options.length ? true : false,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    isDiscount: item.isDiscount,
    price: formattedPrice.format(+item.price),
    priceDiscount: `${item.priceDiscount}%`,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-0 mt-20'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
