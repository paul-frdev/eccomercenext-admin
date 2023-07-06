'use client'
import { useOrigin } from '@/hooks/useOrigin';
import { useParams } from 'next/navigation';
import React, { FC } from 'react'
import { ApiAlert } from './apiAlert';


interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const BaseUrl = `${origin}/api/${params.storeId}`


  return (
    <>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${BaseUrl}/${entityName}`}
      />
       <ApiAlert
        title='GET'
        variant='public'
        description={`${BaseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${BaseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${BaseUrl}/${entityName}/{${entityIdName}}`}
      />
       <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${BaseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
