"use client"

import React, { useState } from 'react'
import { Modal } from './Modal'
import useAuthModal from '@/hooks/useAuthModal'
import Input from './form/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button'
import UseLogin, { Login } from '@/actions/springboot/auth/getLogin'
import toast from 'react-hot-toast'
import { useUser, useUserHook } from '@/hooks/springboot/useUser'

export const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })


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
      onClose();
    } else {
      setUser(false);
      toast.error('Login failed!');
    }
    setIsLoading(false);
  }

  return (
    <Modal title='Wilkommen back' description='Login to ur acc' isOpen={isOpen} onChange={onChange}>
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
          <Button disabled={isLoading} type='submit'>Login</Button>
        </form>
    </Modal>
  )
}
