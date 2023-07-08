'use client'

import React, { FC } from 'react'
import { SizeColumn, sizeColumns } from './sizeColumns'
import { useParams, useRouter } from 'next/navigation'
import { Heading } from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from './dataTable'
import { ApiList } from './apiList'


interface SizeClientProps {
  data: SizeColumn[]
}
export const SizeClient: FC<SizeClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={sizeColumns} data={data} />
      <Heading title='API' description='API calls for sizes' />
      <Separator />
      <ApiList entityIdName='sizeId' entityName='sizes' />
    </>
  )
}
