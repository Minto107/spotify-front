"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/springboot/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import getLogout from '@/actions/springboot/auth/getLogout';
import useRegisterModal from '@/hooks/springboot/useRegisterModal';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({children, className}) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const registerModal = useRegisterModal();
  
  const { user, setUser } = useUser();

  // const userLoggedIn: boolean = userDetails.token !== null;
  const userLoggedIn: boolean = user;

  const handleLogout = async() => {
    const logoutSuccess = await getLogout();
    if (logoutSuccess) {
      setUser(false);
      router.refresh();
      toast.success('Logged out!');
    }
  }

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2'>
          <button onClick={ () => router.back() } className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button onClick={ () => router.forward() } className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button onClick={() => router.push('/')} className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome className='text-black' size={20} />
          </button>
          <button onClick={() => router.push('/search')} className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          {userLoggedIn ? (
            <div className='flex gap-x-4 items-center'>
              <Button className='bg-white px-6 py-2' onClick={ handleLogout }>
                Sign out
              </Button> 
              <Button onClick={ () => router.push('/account') }>
                <FaUserAlt/>
              </Button> 
            </div>
          ) : (
          <>
            <div>
              <Button onClick={ registerModal.onOpen } className='bg-transparent text-neutral-300 font-medium'>
                Sign Up
              </Button>
            </div>
            <div>
              <Button onClick={ authModal.onOpen } className='bg-white px-6 py-2'>
                Login
              </Button>
            </div>
          </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
