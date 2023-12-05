"use client"

import React from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/springboot/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './object/MediaItem'
import useOnPlay from '@/hooks/player/useOnPlay'

interface props {
  songs: Song[];
}

export const Library: React.FC<props> = ({songs}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const onClick = () => {
    if(!user) return authModal.onOpen();
    return uploadModal.onOpen();
    }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-md'>
            Your Library
          </p>
        </div>
        <AiOutlinePlus onClick={onClick} size={20} className='text-neutral-400 cursor-pointer hover:text-white transition'/>
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((e) => {
          return <MediaItem onClick={(id: number) => {onPlay(id)}} key={e.id} data={e} />
        })}
      </div>
    </div>
  )
}
