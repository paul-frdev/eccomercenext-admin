'use client';
import React, { FC, useState } from 'react';
import axios from 'axios';

import { Billboard, Image, MainSlider } from '@prisma/client';
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
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '../modals/alertModal';
import { ImageUpload } from '../imageUpload';

type MainSliderFormValues = z.infer<typeof formSchema>;

interface MainSliderFormProps {
  initialData: MainSlider & {
    images: Image[]
  } | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  images: z.object({ url: z.string() }).array()
});

export const MainSliderForm: FC<MainSliderFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Main Slider' : 'Create Main Slider';
  const description = initialData ? 'Edit Main Slider' : 'Create a new Main Slider';
  const toastMessage = initialData ? 'Main Slider updated' : 'Main Slider created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<MainSliderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      images: [],
    },
  });

  const onSubmit = async (data: MainSliderFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/main-sliders/${params.mainsliderId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/main-sliders`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/main-sliders`);
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
        `/api/${params.storeId}/main-sliders/${params.mainSliderId}`
      );
      router.refresh();
      router.push(`${params.storeId}/main-sliders`);
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
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <label>Images</label>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter(
                          (curImage) => curImage.url !== url
                        ),
                      ])
                    }
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
