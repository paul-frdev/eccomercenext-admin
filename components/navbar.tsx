'use client'

import React from 'react'

import { UserButton } from '@clerk/nextjs'
import { MainNav } from './mainNav'
import { StoreSwitcher } from './storeSwitcher'

export const Navbar = () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}
