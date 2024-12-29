'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { cars, Car } from '../../data/cars'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Battery, Gauge, Zap, DollarSign, Ruler, Calendar, Truck, Trash2 } from 'lucide-react'

interface CompareContentProps {
  selectedCarIds: string[]
}

export default function CompareContent({ selectedCarIds }: CompareContentProps) {
  const router = useRouter()
  const [selectedCars, setSelectedCars] = useState<Car[]>([])

  useEffect(() => {
    const carsToCompare = cars.filter(car => selectedCarIds.includes(car.id))
    setSelectedCars(carsToCompare)
  }, [selectedCarIds])

  const handleRemoveCar = useCallback((carId: string) => {
    setSelectedCars(prevSelectedCars => {
      const updatedSelectedCars = prevSelectedCars.filter(car => car.id !== carId)
      
      // Update URL
      const updatedSelectedCarIds = updatedSelectedCars.map(car => car.id)
      router.push(`/compare?ids=${updatedSelectedCarIds.join(',')}`, { scroll: false })

      // If no cars left, redirect to home page
      if (updatedSelectedCars.length === 0) {
        router.push('/')
      }

      return updatedSelectedCars
    })
  }, [router])

  const renderComparisonTable = useCallback(() => {
    if (selectedCars.length === 0) {
      return (
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">No hay coches seleccionados para comparar.</p>
          <Button 
            onClick={() => router.push('/')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Seleccionar coches para comparar
          </Button>
        </div>
      )
    }

    const characteristics = [
      { name: 'Marca', key: 'brand', icon: null },
      { name: 'Modelo', key: 'model', icon: null },
      { name: 'Año', key: 'year', icon: Calendar },
      { name: 'Precio', key: 'price', icon: DollarSign, format: (value: number) => `${value.toLocaleString()}€` },
      { name: 'Autonomía', key: 'range', icon: Ruler, format: (value: number) => `${value} km` },
      { name: 'Aceleración (0-100 km/h)', key: 'acceleration', icon: Zap, format: (value: number) => `${value}s` },
      { name: 'Velocidad máxima', key: 'topSpeed', icon: Gauge, format: (value: number) => `${value} km/h` },
      { name: 'Tiempo de carga', key: 'chargingTime', icon: Battery, format: (value: number) => `${value} min` },
      { name: 'Capacidad de batería', key: 'batteryCapacity', icon: Battery, format: (value: number) => `${value} kWh` },
      { name: 'Segmento', key: 'segment', icon: null },
      { name: 'Carrocería', key: 'bodyStyle', icon: null },
      { name: 'Capacidad de remolque', key: 'towingCapacity', icon: Truck, format: (value: number) => `${value} kg` },
    ]

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Característica</th>
              {selectedCars.map(car => (
                <th key={car.id} className="p-2 border border-gray-200 dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">
                  <div className="flex justify-between items-center">
                    <span>{car.brand} {car.model}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCar(car.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-900">
              <td className="p-2 border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Imagen</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2 border border-gray-200 dark:border-gray-700">
                  <Image 
                    src={car.imageUrl} 
                    alt={`${car.brand} ${car.model}`} 
                    width={200} 
                    height={150} 
                    className="object-cover rounded"
                  />
                </td>
              ))}
            </tr>
            {characteristics.map(({ name, key, icon: Icon, format }, index) => (
              <tr key={key} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                <td className="p-2 border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />}
                  {name}
                </td>
                {selectedCars.map(car => (
                  <td key={car.id} className="p-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    {format ? format(car[key as keyof Car] as number) : car[key as keyof Car]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [selectedCars, router])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comparación de Coches Eléctricos</h1>

      {renderComparisonTable()}
    </div>
  )
}
