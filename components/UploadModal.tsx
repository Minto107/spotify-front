"use client"

import React, { useState } from 'react'
import uniqid from 'uniqid'
import { Modal } from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/form/Input'
import Button from './Button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/springboot/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import postSong from '@/actions/springboot/postSong'

export const UploadModal = () => {
  const uploadModal = useUploadModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const {register, handleSubmit, reset} = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }

  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields!');
        return;
      }

      const isUploaded = await postSong(songFile, imageFile, {
        title: values.title,
        author: values.author
      });
      if (isUploaded) {
        router.refresh();
        setIsLoading(false);
        toast.success('Song added!');
        reset();
        uploadModal.onClose();
    } else {
        toast.error('Something went wrong...');
    }
    } catch (error) {
      toast.error('Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal title='Upload modal' description='upload desc' isOpen={uploadModal.isOpen} onChange={onChange} >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input id='title' disabled={isLoading} {...register('title', { required: true })} placeholder='Song title' />
        <Input id='author' disabled={isLoading} {...register('author', { required: true })} placeholder='Author' />
        <div>
          <div className='pb-1'>
            Select a song file (MP3 only)
          </div>
          <Input id='song' type='file' disabled={isLoading} {...register('song', { required: true })} accept='.mp3' />
        </div>
        <div>
          <div className='pb-1'>
            Select a cover art
          </div>
          <Input id='image' type='file' disabled={isLoading} {...register('image', { required: true })} accept='image/*' />
        </div>
        <Button disabled={isLoading} type='submit'>Add</Button>
      </form>
    </Modal>
  )
}
