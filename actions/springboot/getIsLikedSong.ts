import axiosInstance from "@/axios.config";
import { Song } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const getIsLikedSong = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.get(`/likedsongs/${id}`);
    const isLiked = await res.data;
    return isLiked;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    toast.error(err.message);
  }

  return false;
}

export default getIsLikedSong;