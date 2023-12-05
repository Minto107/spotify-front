"use client"

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/springboot/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import getIsLikedSong from '@/actions/springboot/getIsLikedSong';
import axiosInstance from '@/axios.config';

interface props {
  songId: number;
}

const LikeButton: React.FC<props> = ({songId}) => {
  const router = useRouter();
  const [likeCounter, setLikeCounter] = useState(0);

  const authModal = useAuthModal();
  const { user } = useUser();

  const [ isLiked, setIsLiked ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isLikedInfo = await getIsLikedSong(songId);

      if (isLikedInfo) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchData();
  }, [songId, likeCounter]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) return authModal.onOpen();

    const res = await axiosInstance.get(`/likedsongs/handleLike/${songId}`);
    setLikeCounter(likeCounter+1);

    router.refresh();
  }

  return (
    <button onClick={handleLike} className='hover:opacity-75 transition'>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}

export default LikeButton