"use client"

import React, { useState } from 'react'
import { Modal } from './Modal'
import Input from './form/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/springboot/useUser'
import postRegister from '@/actions/springboot/auth/postRegister'
import useRegisterModal from '@/hooks/springboot/useRegisterModal'

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      fullName: '',
      password: ''
    }
  })

  const { onClose, isOpen } = useRegisterModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    const register = {
      email: values.email,
      fullName: values.fullName,
      password: values.password
    }

    const registerSuccess = await postRegister(register);

    if (registerSuccess) {
      setUser(true);
      onClose();
    } else {
      setUser(false);
      toast.error('Sign up failed!');
    }
    setIsLoading(false);
  }

  return (
    <Modal title='Wilkommen' description='Register your account here' isOpen={isOpen} onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
          <div>
            <div className='pb-1'>
                Email
            </div>
            <Input id='email' type='text' {...register('email')} placeholder='Email' />
          </div>
          <div>
            <div className='pb-1'>
                Full Name
            </div>
            <Input id='fullName' type='text' {...register('fullName')} placeholder='Full name' />
          </div>
          <div>
            <div className='pb-1'>
                Password
            </div>
            <Input id='password' type='password' {...register('password')} placeholder='Password' />
          </div>
          <Button disabled={isLoading} type='submit'>Register</Button>
        </form>
    </Modal>
  )
}
