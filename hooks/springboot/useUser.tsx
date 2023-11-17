import getUserDetails from '@/actions/springboot/auth/getUserDetails';
import { UserDetails } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  token: string | null;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: UserDetails| null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MySpringUserProvider = (props: Props) => {
  const [user, setUser] = useState(false);
  const [ userDetails, setUserDetails ] = useState<UserDetails | null>(null);
  const [ isLoadingData, setIsLoadingData ] = useState(false);

  useEffect(() => {
    if (!isLoadingData) {
      setIsLoadingData(true);
      
      Promise.allSettled([getUserDetails()]).then((res) => {
        console.log('Fetching user details...');
        const userDetailsPromise = res[0];

        if (userDetailsPromise.status === 'fulfilled') {
          setUserDetails(userDetailsPromise.value as UserDetails);
        }
        setIsLoadingData(false);
    })
  } 
    
  }, [user]);

  const token = null;

  const value = {
    token, user, setUser, userDetails, isLoading: isLoadingData
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (typeof context === undefined) 
    throw new Error('useUser must be used with MyUserContextProvider')
  return context;
}

export const useUserHook = () => {
  const [user, setUser] = useState(false);

  return { user, setUser };
}