import Image from 'next/image'
import { Car } from '../../data/cars'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Gauge, Zap, Scale } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Script from 'next/script'
import { useRouter } from 'next/navigation'

interface CarListProps {
  cars: Car[]
  onSelectCar: (car: Car) => void
  selectedCarsForComparison: string[]
  onToggleComparison: (carId: string) => void
}

const CarList: React.FC<CarListProps> = ({ 
  cars, 
  onSelectCar, 
  selectedCarsForComparison, 
  onToggleComparison 
}) => {
  const router = useRouter();
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map(car => (
          <Card 
            key={car.id} 
            className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="relative">
              <div 
                className="cursor-pointer"
                onClick={() => router.push(`/${car.id}`)}
              >
                <Image 
                  src={car.imageUrl} 
                  alt={`${car.brand} ${car.model}`} 
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                <Badge className="bg-emerald-500 dark:bg-emerald-600">{car.segment}</Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedCarsForComparison.includes(car.id) ? "secondary" : "outline"}
                        size="sm"
                        className={`
                          ${selectedCarsForComparison.includes(car.id) ? 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-700 dark:hover:bg-emerald-600' : 'bg-white/90 dark:bg-gray-700/90'}
                        `}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleComparison(car.id)
                        }}
                      >
                        <Scale className={`w-4 h-4 ${
                          selectedCarsForComparison.includes(car.id) 
                            ? 'text-emerald-600 dark:text-emerald-300' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {selectedCarsForComparison.includes(car.id) 
                        ? 'Quitar de comparación' 
                        : 'Añadir a comparación'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardContent 
              className="p-4 cursor-pointer"
              onClick={() => router.push(`/${car.id}`)}
            >
              <h3 className="text-lg font-semibold mb-2 line-clamp-1 dark:text-white">{car.brand} {car.model}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{car.bodyStyle} • {car.year}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{car.price.toLocaleString()}€</span>
                <Badge variant="outline" className="text-emerald-600 border-emerald-600 dark:text-emerald-400 dark:border-emerald-400">
                  {car.range} km
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center" title="Acceleration">
                  <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="dark:text-gray-300">{car.acceleration}s</span>
                </div>
                <div className="flex items-center" title="Top Speed">
                  <Gauge className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="dark:text-gray-300">{car.topSpeed} km/h</span>
                </div>
                <div className="flex items-center" title="Battery Capacity">
                  <Battery className="w-4 h-4 mr-1 text-green-500" />
                  <span className="dark:text-gray-300">{car.batteryCapacity} kWh</span>
                </div>
              </div>
            </CardContent>
            <CardFooter 
              className="bg-gray-50 dark:bg-gray-700 p-4 cursor-pointer"
              onClick={() => router.push(`/${car.id}`)}
            >
              <div className="w-full flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <span title="Charging Time">Carga rápida: {car.chargingTime} min</span>
                <span title="Towing Capacity">{car.towingCapacity} kg</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Script id="car-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "ItemList",
          "itemListElement": cars.map((car, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": `${car.brand} ${car.model}`,
              "description": `Coche eléctrico ${car.brand} ${car.model} del año ${car.year}`,
              "brand": {
                "@type": "Brand",
                "name": car.brand
              },
              "manufacturer": {
                "@type": "Organization",
                "name": car.brand
              },
              "model": car.model,
              "productionDate": car.year.toString(),
              "vehicleConfiguration": car.bodyStyle,
              "fuelType": "Electricity",
              "driveWheelConfiguration": "FWD",
              "speed": {
                "@type": "QuantitativeValue",
                "value": car.topSpeed,
                "unitCode": "KMH"
              },
              "accelerationTime": {
                "@type": "QuantitativeValue",
                "value": car.acceleration,
                "unitCode": "SEC"
              },
              "fuelConsumption": {
                "@type": "QuantitativeValue",
                "value": car.batteryCapacity,
                "unitCode": "KWH"
              },
              "mileageFromOdometer": {
                "@type": "QuantitativeValue",
                "value": car.range,
                "unitCode": "KMT"
              },
              "offers": {
                "@type": "Offer",
                "price": car.price,
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              },
              "image": car.imageUrl,
              "url": `https://www.electricars.es/${car.id}`
            }
          }))
        })}
      </Script>
    </>
  )
}

export default CarList

