"use client"

import { useState, useEffect } from 'react';
import getLikedSongs from '@/actions/springboot/getLikedSongs';
import { Song } from '@/types';

export const useLikedSongs = () => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getLikedSongs();
      setSongs(result);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  return { songs, loading };
};