import React, { createContext } from 'react'

type User = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
  songs: [] | null;
}

type UserContextType = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MySpringUserProvider = async (props: Props) => {
  const res = await fetch(`${process.env.API_URL}/auth/user`);

  const userContextRes = await res.json();

  if (res.status !== 200) {
    console.log(userContextRes.message);
  }

  
}

const useUser = () => {
  return (
    <div>useUser</div>
  )
}

export default useUser