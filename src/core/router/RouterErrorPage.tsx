import { useRouteError } from 'react-router'
import { ErrorFallback } from '@/ui/components'

export function RouterErrorPage() {
  const routeError = useRouteError()
  
  const error = routeError instanceof Error 
    ? routeError 
    : new Error(String(routeError) || 'Error desconocido')
  
  return (
    <ErrorFallback 
      error={error} 
      resetErrorBoundary={() => window.location.href = '/'} 
    />
  )
}