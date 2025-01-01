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
  const { id } = useParams()
  const car = cars.find(c => c.id === id)

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Coche no encontrado</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el coche que estás buscando.</p>
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
    <>
      <Head>
        <title>{`${car.brand} ${car.model} | ElectriCars`}</title>
        <meta name="description" content={`Descubre el ${car.brand} ${car.model}, un coche eléctrico con ${car.range} km de autonomía y ${car.batteryCapacity} kWh de capacidad de batería.`} />
        <meta property="og:title" content={`${car.brand} ${car.model} | ElectriCars`} />
        <meta property="og:description" content={`Descubre el ${car.brand} ${car.model}, un coche eléctrico con ${car.range} km de autonomía y ${car.batteryCapacity} kWh de capacidad de batería.`} />
        <meta property="og:image" content={car.imageUrl} />
        <meta property="og:url" content={`https://www.electricars.es/${car.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-6 hover:text-emerald-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <Image 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`} 
              width={800} 
              height={600} 
              className="w-full h-auto object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Card>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {car.segment}
                </Badge>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {car.bodyStyle}
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Especificaciones clave</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium">{car.price.toLocaleString()}€</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>{car.range} km de autonomía</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bolt className="h-5 w-5 text-red-500" />
                    <span>{car.acceleration}s (0-100 km/h)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-5 w-5 text-blue-500" />
                    <span>{car.topSpeed} km/h máx.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="h-5 w-5 text-green-500" />
                    <span>{car.batteryCapacity} kWh</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span>{car.chargingTime} min carga</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1">
                <DollarSign className="mr-2 h-5 w-5" />
                Solicitar presupuesto
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1"
                onClick={handleSimulateClick}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Simular en calculadora
              </Button>
            </div>
          </div>
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": `${car.brand} ${car.model}`,
          "description": `El ${car.brand} ${car.model} es un coche eléctrico con ${car.range} km de autonomía y ${car.batteryCapacity} kWh de capacidad de batería.`,
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
        })}
      </script>
    </>
  )
}

