"use client"

import LikeButton from '@/components/favorites/LikeButton';
import MediaItem from '@/components/object/MediaItem';
import useOnPlay from '@/hooks/player/useOnPlay';
import { Song } from '@/types'
import React from 'react'

interface props {
  songs: Song[];
}

const SearchContent: React.FC<props> = ({songs}) => {
  if (!songs || songs.length === 0) return <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>No songs found.</div>

  const onPlay = useOnPlay(songs);

  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
      {songs.map((song) => {
        return <div key={song.id} className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
            <LikeButton songId={song.id} />
        </div>
      })}
    </div>
  )
}

export default SearchContent