'use client';
import React from 'react';
import { PopoverTrigger } from './ui/popover';
import { Store } from '@prisma/client';
import { useStoreModal } from '@/hooks/useStoreModal';
import { useParams, useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id
  }));

  

  return <div>StoreSwitcher</div>;
};
