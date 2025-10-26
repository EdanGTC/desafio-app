import { StrictMode } from 'react'
import type { PropsWithChildren } from 'react'
import QueryClientNavigationProvider from './query-client.providers.navigation'

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <StrictMode>
      <QueryClientNavigationProvider>
        {children}
      </QueryClientNavigationProvider>
    </StrictMode>
  )
}
