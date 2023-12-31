import prismadb from '@/lib/prismadb';

import { SizeForm } from '@/components/forms/sizeForm';

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = (await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  })) as any;

  return (
    <div className='flex-col'>
      <div className='flex-1 spacing-y-8 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
