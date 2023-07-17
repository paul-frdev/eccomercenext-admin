import React from 'react';

import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from './mainNav';
import { StoreSwitcher } from './storeSwitcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='border-b'>
      <div className=' fixed bg-white top-0 left-0 w-full pt-4 flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};
