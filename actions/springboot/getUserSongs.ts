import axiosInstance from "@/axios.config";
import { Song } from "@/types"
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const getUserSongs = async (): Promise<Song[]> => {
  try {
    const res = await axiosInstance.get('/songs/user');
    const songs = await res.data;
    return (songs as any) || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    toast.error(err.message);
  }
  return [];
}

export default getUserSongs