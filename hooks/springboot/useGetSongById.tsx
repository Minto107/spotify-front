"use client"

import getSongById from "@/actions/springboot/getSongById";
import { Song } from "@/types";
import { useState, useEffect } from "react";

export const useGetSongById = (id: number) => {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getSongById(id);
      setSong(result);
      setLoading(false);
    };

    fetchSongs();
  }, [id]);

  return { song, loading };
};