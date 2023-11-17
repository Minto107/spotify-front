"use client"

import getUserSongs from "@/actions/springboot/getUserSongs";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export const useUserSongs = () => {
  const { user } = useUser();
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getUserSongs();
      setSongs(result);
      setLoading(false);
    };

    fetchSongs();
  }, [user]);

  return { songs, loading };
};
