import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const schemaForm = z.object({
  name: z.string().min(1),
});
export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schemaForm>) => {
    // TODO: create store
    try {
      setLoading(true)

      const response = await axios.post('/api/stores', values)

      window.location.assign(`${response.data.id}`)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  };
  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className='space-y-4 py-4 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='E-Commerce'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-6 space-x-2 flex items-center justify-end'>
              <Button
                disabled={loading}
                variant='outline'
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type='submit'>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
