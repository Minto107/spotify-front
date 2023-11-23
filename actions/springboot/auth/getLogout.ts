"use client"

import axiosInstance from '@/axios.config'
import { useUser } from '@/hooks/springboot/useUser';

const getLogout = async (): Promise<any> => {
  try {
    // const { setUser } = useUser();
    const res = await axiosInstance.get(`/auth/logout`, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    // setUser(false);
    return true;
  } catch (error) {
    console.log(error);
  }
  
  return false;
}

export default getLogout;