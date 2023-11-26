import { Song } from "@/types";
import axiosInstance from "../../axios.config.js";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const getSongs = async (): Promise<Song[]> => {
  try {
    const res = await axiosInstance.get('/songs', {
      withCredentials: false
    });
    const songs = await res.data;
    return (songs as any) || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    // toast.error(err.message);
  }
  return [];
}

export default getSongs;