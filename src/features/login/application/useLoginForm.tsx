import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './use-auth.hook'
import { useNavigate } from 'react-router'
import { loginSchema, type LoginFormData } from '../domain/login.schemas'
import { useCallback } from 'react'

export const useLoginForm = () => {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      await login(data)
      navigate('/home')
    } catch (error) {
      console.error('Error en login:', error)
    }
  }, [login, navigate])

  return {
    handlers: {
      register,
      onSubmit: handleFormSubmit(onSubmit),
    },
    state: {
      isLoading,
      error,
      errors,
    },
  }
}
