import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { appQueryClientSingleton } from '../clients/query/query.client';

export default function QueryClientNavigationProvider({
  children,
}: PropsWithChildren) {
  return (
    <QueryClientProvider client={appQueryClientSingleton}>
      {children}
    </QueryClientProvider>
  );
}
