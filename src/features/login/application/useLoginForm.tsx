import React, { useState } from 'react'
import { useAuth } from './use-auth.hook'
import { useNavigate } from 'react-router'

export const useLoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, error } = useAuth()
    const navigate = useNavigate()
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      
      try {
        await login({ email, password })
        navigate('/home')
      } catch (error) {
        console.error('Error en login:', error)
      }
    }

    return {
        state: {
            email,
            password,
            isLoading,
            error,
        },
        handlers: {
            setEmail,
            setPassword,
            handleSubmit,
        },
    }
}
