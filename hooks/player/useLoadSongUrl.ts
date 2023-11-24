import { Song } from "@/types";

const useLoadSong = (song: Song) => {

  if (!song) return '';

  //TODO fix url?
  const url = `${process.env.NEXT_PUBLIC_API_URL}/songs/songMp3/${song.id}`

  return url;
}

export default useLoadSong;