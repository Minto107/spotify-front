"use client"

import getUserSongs from "@/actions/springboot/getUserSongs";
import { Song } from "@/types";
import { useEffect, useState } from "react";

export const useUserSongs = () => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getUserSongs();
      setSongs(result);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  return { songs, loading };
};
