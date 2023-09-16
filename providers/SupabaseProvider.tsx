"use client"

import { Database } from "@/types_db"
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SPProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SPProps> = ({children}) => {
  const [spClient] = useState(() => {
    return createClientComponentClient<Database>()
  })
  return (
    <SessionContextProvider supabaseClient={spClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;