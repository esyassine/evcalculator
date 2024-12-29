import { Car } from '../../data/cars'
import { Button } from "@/components/ui/button"
import { Scale, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import Link from 'next/link'

interface ComparisonTrayProps {
  selectedCarsForComparison: string[]
  onRemove: (carId: string) => void
  cars: Car[]
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  selectedCarsForComparison,
  onRemove,
  cars,
}) => {
  const selectedCarsData = useMemo(() => 
    cars.filter(car => selectedCarsForComparison.includes(car.id)),
    [selectedCarsForComparison, cars]
  )

  if (selectedCarsData.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-emerald-50 dark:bg-emerald-900 border-t border-emerald-200 dark:border-emerald-700 shadow-lg transform transition-transform duration-300 z-50">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                Comparando {selectedCarsData.length} {selectedCarsData.length === 1 ? 'coche' : 'coches'}
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {selectedCarsData.map(car => (
                <div key={car.id} className="relative group flex-shrink-0">
                  <div className="w-16 h-12 relative">
                    <Image
                      src={car.imageUrl}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover rounded"
                    />
                    <button
                      onClick={() => onRemove(car.id)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Eliminar ${car.brand} ${car.model} de la comparación`}
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 block text-center line-clamp-1">
                    {car.brand} {car.model}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link href={`/compare?ids=${selectedCarsForComparison.join(',')}`} passHref>
            <Button
              className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Comparar ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ComparisonTray
