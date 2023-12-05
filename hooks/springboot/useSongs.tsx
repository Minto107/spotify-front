"use client"

import { useState, useEffect } from 'react';
import { Song } from '@/types';
import getSongs from '@/actions/springboot/getSongs';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getSongs();
      setSongs(result);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  return { songs, loading };
};