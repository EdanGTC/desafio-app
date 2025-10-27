import { StrictMode } from 'react'
import type { PropsWithChildren } from 'react'
import QueryClientNavigationProvider from './query-client.providers.navigation'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/ui/components/error-fallback'

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <StrictMode>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
        )}
      >
        <QueryClientNavigationProvider>
          {children}
        </QueryClientNavigationProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
