'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CompareContent from './compare-content'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const ids = searchParams.get('ids')
    if (ids) {
      setSelectedCars(ids.split(','))
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="h-10 w-32">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-8 w-64">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    )
  }

  if (selectedCars.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comparación de Coches Eléctricos</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">No hay coches seleccionados para comparar.</p>
          <Button 
            onClick={() => router.push('/')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Seleccionar coches para comparar
          </Button>
        </div>
      </div>
    )
  }

  return <CompareContent selectedCarIds={selectedCars} />
}
