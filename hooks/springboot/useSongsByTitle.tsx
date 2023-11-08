"use client"

import getSongsByTitle from "@/actions/springboot/getSongsByTitle";
import { Song } from "@/types";
import { useState, useEffect } from "react";

export const useSongsByTitle = (title: string) => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getSongsByTitle(title);
      setSongs(result);
      setLoading(false);
    };

    fetchSongs();
  }, [title]);

  return { songs, loading };
};