import { Song } from "@/types";

const useLoadSong = (song: Song) => {

  if (!song) return '';
  console.log(song);

  //TODO fix url?
  const url = `http://localhost:8080/api/songs/songMp3/${song.id}`

  return url;
}

export default useLoadSong;