"use client"

import axiosInstance from '@/axios.config'
import React from 'react'

export type Login = {
  email: string;
  password: string;
}

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

const UseLogin = async (loginForm: Login): Promise<any> => {
  try {
    const res = await axiosInstance.post(`/auth/login`, loginForm, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    const data: UserContextType = res.data;
    // localStorage.setItem("accessToken", data.token!);
    return true;
  } catch (error) {
    console.log(error);
  }
  
  return false;
}

export default UseLogin