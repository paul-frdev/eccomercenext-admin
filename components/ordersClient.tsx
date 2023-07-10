'use client';

import { Separator } from '@/components/ui/separator';
import { OrdersColumn, ordersColumns } from './OrdersColumns';
import { Heading } from './heading';
import { DataTable } from './dataTable';

interface OrderClientProps {
  data: OrdersColumn[];
}

export const OrdersClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable searchKey='products' columns={ordersColumns} data={data} />
    </>
  );
};
