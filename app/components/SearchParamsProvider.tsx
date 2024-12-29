'use client'

import { useSearchParams } from 'next/navigation'
import { createContext, useContext } from 'react'

const SearchParamsContext = createContext<ReturnType<typeof useSearchParams> | null>(null)

export function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  return (
    <SearchParamsContext.Provider value={searchParams}>
      {children}
    </SearchParamsContext.Provider>
  )
}

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext)
  if (!context) {
    throw new Error('useSearchParamsContext must be used within a SearchParamsProvider')
  }
  return context
}
