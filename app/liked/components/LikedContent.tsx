"use client"

import LikeButton from '@/components/favorites/LikeButton';
import MediaItem from '@/components/object/MediaItem';
import useOnPlay from '@/hooks/player/useOnPlay';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface props {
  songs: Song[];
}

const LikedContent: React.FC<props> = ({songs}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) router.replace('/');
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>No liked songs.</div>
    )
  }

  return (
    <div className='flex flex-col gap-y-6 w-full p-6'>
      {songs.map((e) => {
        return <div className='flex items-center gap-x-4 w-full' key={e.id}>
          <div className='flex-1'>
            <MediaItem onClick={(id: string) => {onPlay(id)}} data={e} />
          </div>
          <LikeButton songId={e.id} />
        </div>
      })}
    </div>
  )
}

export default LikedContent