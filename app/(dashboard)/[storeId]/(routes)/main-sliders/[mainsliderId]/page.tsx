import prismadb from '@/lib/prismadb';

import { MainSliderForm } from '@/components/forms/mainSliderForm';

const MainSliderPage = async ({
  params,
}: {
  params: { mainsliderId: string };
}) => {
  const mainSlider = await prismadb.mainSlider.findUnique({
    where: {
      id: params.mainsliderId,
    },
    include: {
      images: true
    }
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 spacing-y-8 p-8 pt-6'>
        <MainSliderForm initialData={mainSlider} />
      </div>
    </div>
  );
};

export default MainSliderPage;
