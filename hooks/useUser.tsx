import { UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserProvider = (props: Props) => {
  const {session, isLoading: isLoadingUser, supabaseClient: supabase} = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetais = () => supabase.from('users').select('*').single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoading(true);

      Promise.allSettled([getUserDetais()]).then((res) => {
        const userDetailsPromise = res[0];

        if (userDetailsPromise.status === 'fulfilled') {
          setUserDetails(userDetailsPromise.value.data as UserDetails)
        }

        setIsLoading(false);
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken, user, userDetails, isLoading: isLoadingData || isLoadingUser
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('useUser must be used with MyUserContextProvider');

  return context;
}