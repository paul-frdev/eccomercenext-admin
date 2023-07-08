import { CategoryForm } from '@/components/forms/categoryForm';
import prismadb from '@/lib/prismadb';

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-1 spacing-y-8 p-8 pt-6'>
      <CategoryForm billboards={billboards} initialData={category} />
    </div>
  );
};

export default CategoryPage;
