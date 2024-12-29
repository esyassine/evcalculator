import { Suspense } from 'react'
import { SearchParamsProvider } from '../components/SearchParamsProvider'
import Calculator from './Calculator'

export default function CalculadoraPage() {
  return (
    <Suspense fallback={<div>Cargando calculadora...</div>}>
      <SearchParamsProvider>
        <Calculator />
      </SearchParamsProvider>
    </Suspense>
  )
}
