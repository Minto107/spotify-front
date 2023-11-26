export interface UserDetails {
  token: string | null;
  user: User | null;
}

export interface Song {
  id: number;
  user: User;
  author: string;
  title: string;
  songPath: string;
  imagePath: string;
}

export interface SongUpload {
  author: string;
  title: string;
}

export interface User {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
  songs: [] | null;
}