import { Song } from "@/types";
import axiosInstance from "../../axios.config.js";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const getSongs = async (): Promise<Song[]> => {
  // const res = await fetch(`${process.env.API_URL}/songs`);

  // const songs = await res.json();

  // if (res.status !== 200) {
  //   console.log(songs.message);
  //   return [];
  // }

  //return (songs as any) || [];

  try {
    const res = await axiosInstance.get('/songs', {
      withCredentials: false
    });
    const songs = await res.data;
    return (songs as any) || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    toast.error(err.message);
  }
  return [];
}

export default getSongs;