"use client"

import { Song } from '@/types'
import React from 'react'
import SongItem from './object/SongItem';
import useOnPlay from '@/hooks/player/useOnPlay';
import { useSongs } from '@/hooks/springboot/useSongs';

interface props {
  songs: Song[];
}

const PageContent = () => {

  const { songs, loading } = useSongs();

  const onPlay = useOnPlay(songs!);

  if (loading || songs!.length === 0) {
    return (
      <div className='mt-4 text-neutral-400'>
        No songs available
      </div>
    )
  }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
      {songs!.map((e) => {
        return <SongItem key={e.id} onClick={(id: number) => {onPlay(id)}} data={e} />;
      })}
    </div>
  )
}

export default PageContent;