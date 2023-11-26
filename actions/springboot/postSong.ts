import axiosInstance from "@/axios.config";
import { Song, SongUpload } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const postSong = async (mp3: File, img: File, song: SongUpload): Promise<boolean> => {
  try {
    const data = new FormData();
    data.append('mp3', mp3);
    data.append('img', img);
    data.append('dto', new Blob([JSON.stringify(song)], { type: 'application/json' }));
    const res = await axiosInstance.post(`/songs`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return true;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    toast.error(err.message);
  }

  return false;
}

export default postSong;