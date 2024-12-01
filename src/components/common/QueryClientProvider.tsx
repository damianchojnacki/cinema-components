import React, { ReactNode } from 'react'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from '@tanstack/react-query'

const QueryClientProvider = ({
  children,
  queryClient,
}: {
  children: ReactNode
  queryClient: QueryClient
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
