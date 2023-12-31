"use client"

import useLoadImage from '@/hooks/springboot/useLoadImage';
import { Song } from '@/types'
import Image from 'next/image';
import React from 'react'

interface props {
  data: Song;
  onClick?: (id: number) => void;
}

const MediaItem: React.FC<props> = ({data, onClick}) => {
  const imgUrl = useLoadImage(data.id);
  const handleClick = () => {
    if (onClick) return onClick(data.id);
    //TODO turn on player
  }
  return (
    <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image loader={({ src }) => src} fill src={imgUrl || '/images/liked.jpg'} alt='media item' className='object-cover' />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem