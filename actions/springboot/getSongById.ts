import axiosInstance from '@/axios.config';
import { Song } from '@/types';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const getSongById = async (id: number): Promise<Song> => {
  if (id === undefined) return null as any;
  try {
    const res = await axiosInstance.get(`/songs/byId/${id}`);

    const songs = await res.data;
    return (songs as any) || null;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    toast.error(err.message);
  }

  return null as any;
}

export default getSongById