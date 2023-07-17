import { FC } from 'react';
import prismadb from '@/lib/prismadb';

import { SettingsForm } from '@/components/forms/settingsForm';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-0 mt-20'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
