'use client';

import { Billboard } from '@prisma/client';
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
import { ImageUpload } from '../imageUpload';

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log('initialData', initialData);

  const title = initialData ? 'Edit Billboard' : 'Create Billboard';
  const description = initialData ? 'Edit Billboard' : 'Create a new Billboard';
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`${params.storeId}/billboards`);
      toast.success('Billboard deleted.');
    } catch (error) {
      toast.error('Make sure you removed all categories this billboard');
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <label>Background image</label>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <label>Label</label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
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
