'use client'

import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[]
}

export const ImageUpload: FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpLoad = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null;
  }


  return (
    <div>
      <div className='mb-4 flex items-center gap-2'>
        {value.map((url) => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button type='button' onClick={() => onRemove(url)} variant='destructive' size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image className='object-cover' fill src={url} alt='image' />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpLoad} uploadPreset='cv2fbvhk'>
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button type='button' disabled={disabled} variant='secondary' onClick={onClick}>
              <ImagePlus className='w-4 h-4 mr-2' />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
