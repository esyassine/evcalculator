'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cars } from '../../data/cars'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Battery, Bolt, Car, Clock, DollarSign, Gauge, MapPin, Zap, Calculator } from 'lucide-react'
import Head from 'next/head'

export default function CarDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  console.log('Params:', params) // For debugging

  if (!id) {
    console.log('ID is missing') // For debugging
    return <div>Loading...</div>
  }

  const car = cars.find(c => c.id === id)

  console.log('Found car:', car) // For debugging

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Coche no encontrado</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el coche con ID "{id}". Puede que la URL sea incorrecta o que el coche ya no esté en nuestro catálogo.</p>
          <Button onClick={() => router.push('/')} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
          </Button>
        </Card>
      </div>
    )
  }

  const handleSimulateClick = () => {
    const params = new URLSearchParams({
      batteryCapacity: car.batteryCapacity.toString(),
      range: car.range.toString(),
      consumption: (car.batteryCapacity / car.range * 100).toFixed(2),
    }).toString()
    router.push(`/calculadora?${params}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{`${car.brand} ${car.model} | ElectriCars`}</title>
        <meta name="description" content={`Descubre el ${car.brand} ${car.model}, un coche eléctrico con ${car.range} km de autonomía y ${car.batteryCapacity} kWh de capacidad de batería.`} />
      </Head>
      <Button onClick={() => router.push('/')} variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
          <p className="text-xl text-gray-600 mb-4">{car.year} {car.bodyStyle}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Battery className="mr-2 text-emerald-500" />
              <span>{car.batteryCapacity} kWh</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-emerald-500" />
              <span>{car.range} km</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 text-emerald-500" />
              <span>{car.acceleration}s (0-100 km/h)</span>
            </div>
            <div className="flex items-center">
              <Gauge className="mr-2 text-emerald-500" />
              <span>{car.topSpeed} km/h</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-emerald-500" />
              <span>{car.chargingTime} min (carga rápida)</span>
            </div>
            <div className="flex items-center">
              <Car className="mr-2 text-emerald-500" />
              <span>{car.towingCapacity} kg</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Precio</h2>
            <p className="text-3xl font-bold text-emerald-600">{car.price.toLocaleString()}€</p>
          </div>

          <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  El {car.brand} {car.model} del {car.year} es un vehículo eléctrico impresionante que combina 
                  rendimiento, eficiencia y estilo. Con una autonomía de {car.range} km y una aceleración de 
                  0 a 100 km/h en solo {car.acceleration} segundos, este coche ofrece una experiencia de 
                  conducción emocionante y respetuosa con el medio ambiente.
                </p>
                <Separator className="my-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Su batería de {car.batteryCapacity} kWh se puede cargar rápidamente en solo {car.chargingTime} minutos, 
                  lo que lo hace ideal para viajes largos. Con una velocidad máxima de {car.topSpeed} km/h, 
                  este {car.bodyStyle} del segmento {car.segment} es perfecto para aquellos que buscan un 
                  vehículo eléctrico sin comprometer el rendimiento o el confort.
                </p>
              </CardContent>
            </Card>

          <Button onClick={handleSimulateClick} className="w-full mb-4">
            <Calculator className="mr-2 h-5 w-5" /> Simular costes
          </Button>
          <div className="flex space-x-2">
            <Badge>{car.segment}</Badge>
            <Badge variant="outline">{car.bodyStyle}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

