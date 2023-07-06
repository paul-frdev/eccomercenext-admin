import { BillboardForm } from '@/components/forms/billboardForm';
import prismadb from '@/lib/prismadb';
import { Billboard } from '@prisma/client';


const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  }) as any;


  return (
    <div className='flex-col'>
      <div className='flex-1 spacing-y-8 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage;