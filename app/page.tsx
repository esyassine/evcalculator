import { Suspense } from 'react'
import { SearchParamsProvider } from './components/SearchParamsProvider'
import HomePage from './components/HomePage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsProvider>
        <HomePage />
      </SearchParamsProvider>
    </Suspense>
  )
}
