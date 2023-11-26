"use client"

export interface Register {
  fullName: string,
  email: string,
  password: string
}

import axiosInstance from '@/axios.config'

const postRegister = async (registerForm: Register): Promise<any> => {
  try {
    const res = await axiosInstance.post(`/auth/register`, registerForm, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  
  return false;
}

export default postRegister;