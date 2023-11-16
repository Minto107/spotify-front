export interface UserDetails {
  token: string | null;
  user: User;
}

export interface Song {
  id: string;
  user: User;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface User {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
  songs: [] | null;
}