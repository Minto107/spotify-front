import axiosInstance from '@/axios.config';
import { Song } from '@/types';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  if (title === undefined || title.length === 0 || title === '') return [];

  try {
    const res = await axiosInstance.get(`/songs/${title}`);

    const songs = await res.data;
    return (songs as any) || [];
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    toast.error(err.message);
  }

  return [];
}

export default getSongsByTitle