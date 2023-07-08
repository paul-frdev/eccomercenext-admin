'use client'

import React, { FC } from 'react'
import { Heading } from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { BillboardColumn, columns } from './columns'
import { DataTable } from './dataTable'
import { ApiList } from './apiList'


interface BillboardClientProps {
  data: BillboardColumn[]
}
export const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className=' mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      <Heading title='API' description='API calls for BIllboards' />
      <Separator />
      <ApiList entityIdName='billboardId' entityName='billboards' />
    </>
  )
}
