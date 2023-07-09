'use client';

import { Color } from '@prisma/client';
import React, { FC, useState } from 'react';
import { Heading } from '../heading';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '../ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '../modals/alertModal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: 'String must be a valid hex code',
  }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Color' : 'Create Color';
  const description = initialData ? 'Edit Color' : 'Create a new Color';
  const toastMessage = initialData ? 'Color updated' : 'Color created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`${params.storeId}/colors`);
      toast.success('Color deleted.');
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this color first'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex justify-between items-center mb-4'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant='destructive'
            size='icon'
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className='w-4 h-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full mb-4'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <label>Name</label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Color name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <label>Value</label>
                  </FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-x-4'>
                      <Input
                        disabled={loading}
                        placeholder='Color value'
                        {...field}
                      />
                      <span
                        className='border p-4 rounded-full'
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
