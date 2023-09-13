"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface LIProps {
    image: string;
    name: string;
    href: string;
}

export const ListItem: React.FC<LIProps> = ({image, name, href}) => {
  const router = useRouter();

  const onClick = () => {
    //TODO add auth
    router.push(href);
  }
  return (
    <button onClick={onClick} className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image className='object-cover' fill src={image} alt='Liked playlist image' />
      </div>
      <p className='font-medium truncate py-5'>
        {name}
      </p>
      <div className='absolute rounded-full bg-green-500 p-4 transition opacity-0 flex items-center justify-center drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-black' />
      </div>
    </button>
  )
}
