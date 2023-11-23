"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import Input from './form/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button'
import UseLogin, { Login } from '@/actions/springboot/auth/UseLogin'
import toast from 'react-hot-toast'
import getLikedSongs from '@/actions/springboot/getLikedSongs'
import { useUser, useUserHook } from '@/hooks/springboot/useUser'

export const AuthModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useUser();

  // if (user)
  //   setUser(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [])

  const { onClose, isOpen } = useAuthModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    const login: Login = {
      email: values.email,
      password: values.password
    }

    const loginSuccess = await UseLogin(login);

    if (loginSuccess) {
      setUser(true);
      setIsLoading(false);
      // window.location.reload();
      onClose();
    } else {
      setUser(false);
      toast.error('Login failed!');
    }
  }

  return (
    <Modal title='Wilkommen back' description='Login to ur acc' isOpen={isOpen} onChange={onChange}>
      {/* <Auth theme='dark' magicLink providers={["github"]} supabaseClient={supabaseClient} appearance={{theme: ThemeSupa, 
        variables: {
          default: {
            colors: {
              brand: '#404040',
              brandAccent: '#22c55e'
            }
          }
        }}} /> */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
          <div>
            <div className='pb-1'>
                Email
            </div>
            <Input id='email' type='text' {...register('email')} placeholder='Email' />
          </div>
          <div>
            <div className='pb-1'>
                Password
            </div>
            <Input id='password' type='password' {...register('password')} placeholder='Password' />
          </div>
          <Button type='submit'>Login</Button>
        </form>
    </Modal>
  )
}
