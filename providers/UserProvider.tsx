"use client"

import { MySpringUserProvider } from "@/hooks/springboot/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  return (
    <MySpringUserProvider>
      {children}
    </MySpringUserProvider>
  )
}

export default UserProvider;