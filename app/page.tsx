'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { BatteryIcon, HomeIcon, ZapIcon, EuroIcon, CarIcon, LeafIcon, ClockIcon, CalendarIcon } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/ui/Toggle"
import { ThemeProvider } from "@/components/ui/Provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import Image from 'next/image'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Tesla from "../public/img/tesla.png"
import Tipo2 from "../public/img/Tipo2.png"
import CCS from "../public/img/CCS.png"
import CHAdeMO from "../public/img/CHAdeMO.png"
import CarFinanceCalculator from './CarFinanceCalculator'


const googleMapsApiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.4168,
  lng: -3.7038,
};

const connectors = [
  {
    name: "Tipo 2 (Mennekes)",
    image: Tipo2,
    description: "Estándar europeo para carga en AC. Soporta carga monofásica y trifásica hasta 43 kW.",
    pros: ["Ampliamente utilizado en Europa", "Permite carga rápida en AC"],
    cons: ["No soporta carga ultra-rápida en DC"]
  },
  {
    name: "CCS (Combo)",
    image: CCS,
    description: "Combina el conector Tipo 2 con pines adicionales para carga rápida en DC. Permite cargas de hasta 350 kW.",
    pros: ["Soporta carga rápida y ultra-rápida", "Estándar europeo para nuevos vehículos"],
    cons: ["Menos común en vehículos más antiguos"]
  },
  {
    name: "CHAdeMO",
    image: CHAdeMO,
    description: "Estándar japonés para carga rápida en DC. Soporta cargas de hasta 62.5 kW.",
    pros: ["Ampliamente utilizado en vehículos japoneses", "Permite carga bidireccional"],
    cons: ["Menos común en nuevos vehículos europeos", "Limitado a 62.5 kW"]
  },
  {
    name: "Tesla",
    image: Tesla,
    description: "Conector propietario de Tesla para carga en AC y DC. Permite cargas de hasta 250 kW en Superchargers V3.",
    pros: ["Acceso a la red de Superchargers", "Diseño compacto"],
    cons: ["Exclusivo para vehículos Tesla", "Requiere adaptador para usar otros cargadores"]
  }
]

const chargingPoints = [
  { id: 1, lat: 40.407995, lng: -3.691906, name: "Estación de Atocha", points: 4 },
  { id: 2, lat: 40.425827, lng: -3.690474, name: "Plaza de Colón", points: 6 },
  { id: 3, lat: 40.478992, lng: -3.711717, name: "Centro Comercial La Vaguada", points: 8 },
  { id: 4, lat: 40.470832, lng: -3.562511, name: "Aeropuerto Adolfo Suárez Madrid-Barajas", points: 10 },
  { id: 5, lat: 40.467728, lng: -3.617686, name: "IFEMA", points: 12 },
  { id: 6, lat: 40.416775, lng: -3.703790, name: "Puerta del Sol", points: 5 },
  { id: 7, lat: 40.452073, lng: -3.686551, name: "Estadio Santiago Bernabéu", points: 7 },
  { id: 8, lat: 40.437954, lng: -3.681540, name: "Torre Picasso", points: 4 },
  { id: 9, lat: 40.415514, lng: -3.707186, name: "Plaza Mayor", points: 3 },
  { id: 10, lat: 40.404303, lng: -3.691557, name: "Museo Reina Sofía", points: 4 },
  { id: 11, lat: 40.433926, lng: -3.676200, name: "Azca", points: 6 },
  { id: 12, lat: 40.403633, lng: -3.707784, name: "Calle de Toledo", points: 3 },
  { id: 13, lat: 40.411171, lng: -3.684899, name: "Calle de Alcalá", points: 5 },
  { id: 14, lat: 40.377162, lng: -3.636198, name: "Parque Lineal del Manzanares", points: 4 },
  { id: 15, lat: 40.442583, lng: -3.677391, name: "Paseo de la Castellana", points: 9 },
  { id: 16, lat: 40.453103, lng: -3.688143, name: "Cuatro Torres Business Area", points: 8 },
  { id: 17, lat: 40.413702, lng: -3.692300, name: "Gran Vía", points: 6 },
  { id: 18, lat: 40.383042, lng: -3.719676, name: "Casa de Campo", points: 7 },
  { id: 19, lat: 40.423729, lng: -3.685649, name: "Calle Serrano", points: 5 },
  { id: 20, lat: 40.418908, lng: -3.682249, name: "Círculo de Bellas Artes", points: 4 }
];

export default function ElectricCarCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState(49.2)
  const [chargingPower, setChargingPower] = useState(4.0)
  const [averageConsumption, setAverageConsumption] = useState(14.6)
  const [isHomeCharging, setIsHomeCharging] = useState(true)
  const [electricityPrice, setElectricityPrice] = useState(0.109420)
  const [motorRange, setMotorRange] = useState(402)
  const [connectorType, setConnectorType] = useState("type2")
  const [dailyDrivingDistance, setDailyDrivingDistance] = useState(50)
  const [results, setResults] = useState({
    dischargeTime: 0,
    chargingTime: 0,
    consumption: 0,
    chargeCost: 0,
    actualRange: 0,
    efficiency: 0,
    costPer100km: 0,
    co2Saved: 0,
    chargingTime80Percent: 0,
    dailyRangeEstimate: 0
  })

  const { theme, setTheme } = useTheme()

  const calculateResults = () => {
    const dischargeTime = batteryCapacity / averageConsumption
    const chargingTime = batteryCapacity / chargingPower
    let consumption = batteryCapacity * (isHomeCharging ? 1 : 1.2)
    
    switch(connectorType) {
      case "type2":
        consumption *= 0.95;
        break;
      case "ccs":
        consumption *= 0.92;
        break;
      case "chademo":
        consumption *= 0.93;
        break;
      case "tesla":
        consumption *= 0.96;
        break;
    }
    
    const chargeCost = consumption * electricityPrice
    const actualRange = (batteryCapacity / averageConsumption) * 100
    const efficiency = 100 / averageConsumption
    const costPer100km = (averageConsumption * electricityPrice)
    const co2Saved = (actualRange * 120) / 1000 // Asumiendo 120g CO2/km para un coche de combustión promedio
    const chargingTime80Percent = (batteryCapacity * 0.8) / chargingPower
    const dailyRangeEstimate = Math.min(dailyDrivingDistance, actualRange)

    setResults({
      dischargeTime,
      chargingTime,
      consumption,
      chargeCost,
      actualRange,
      efficiency,
      costPer100km,
      co2Saved,
      chargingTime80Percent,
      dailyRangeEstimate
    })
  }

  useEffect(() => {
    calculateResults()
  }, [batteryCapacity, chargingPower, averageConsumption, isHomeCharging, electricityPrice, motorRange, connectorType, dailyDrivingDistance])

  const handleChargingPowerChange = (value: string) => {
    setChargingPower(Number(value))
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsHomeCharging(checked)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground p-0 md:p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Calculadora EV</h1>
            <ThemeToggle />
          </div>
          
          <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400">
          <div className="flex space-x-4">
            <TabsTrigger value="calculator" className="min-w-[120px] text-center">Calculadora</TabsTrigger>
            <TabsTrigger value="info" className="min-w-[120px] text-center">Información</TabsTrigger>
            {/* <TabsTrigger value="chargingPoints" className="min-w-[120px] text-center">Puntos de Recarga</TabsTrigger> */}
            <TabsTrigger value="conectores" className="min-w-[120px] text-center">Conectores</TabsTrigger>
            {/* <TabsTrigger value="financiacion" className="min-w-[120px] text-center">Financiación</TabsTrigger> */}
          </div>
          </TabsList>
            <br></br>
            <TabsContent value="calculator">
              <Card className="bg-green-50 dark:bg-black">
                <CardHeader>
                  <CardTitle>Parámetros del Vehículo Eléctrico</CardTitle>
                  <CardDescription>Ingrese los detalles de su vehículo eléctrico para calcular los costos y la eficiencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="batteryCapacity">Capacidad de la Batería (kWh)</Label>
                        <Input
                          id="batteryCapacity"
                          type="number"
                          value={batteryCapacity}
                          onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motorRange">Autonomía del Motor Eléctrico (km)</Label>
                        <Input
                          id="motorRange"
                          type="number"
                          value={motorRange}
                          onChange={(e) => setMotorRange(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="averageConsumption">Consumo Promedio (kWh/100km)</Label>
                        <Input
                          id="averageConsumption"
                          type="number"
                          value={averageConsumption}
                          onChange={(e) => setAverageConsumption(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="connectorType">Tipo de Conector (Tipos de cargadores)</Label>
                        <Select value={connectorType} onValueChange={setConnectorType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de conector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="type2">Tipo 2 (Mennekes)</SelectItem>
                            <SelectItem value="ccs">CCS (Combo)</SelectItem>
                            <SelectItem value="chademo">CHAdeMO</SelectItem>
                            <SelectItem value="tesla">Tesla</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="electricityPrice">Precio de la Electricidad (€/kWh)</Label>
                        <Input
                          id="electricityPrice"
                          type="number"
                          value={electricityPrice}
                          step="0.1"
                          min="0"
                          max="0.9"
                          onChange={(e) => setElectricityPrice(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dailyDrivingDistance">Dist. de Conducción Diaria (km)</Label>
                        <Input
                          id="dailyDrivingDistance"
                          type="number"
                          value={dailyDrivingDistance}
                          onChange={(e) => setDailyDrivingDistance(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-4">
                        <Label>Potencia de Carga (kW): {chargingPower.toFixed(1)}</Label>
                        <Slider
                          min={1.0}
                          max={22}
                          step={0.1}
                          value={[chargingPower]}
                          onValueChange={handleChargingPowerChange as any}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>4.0 kW</span>
                          <span>22 kW</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="charging-mode"
                          checked={isHomeCharging}
                          onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="charging-mode">Carga en Casa</Label>
                        {isHomeCharging ? <HomeIcon className="ml-2" /> : <ZapIcon className="ml-2" />}
                      </div>
                    </div>
                    <Button onClick={calculateResults} className="w-full sm:w-auto">Calcular</Button>
                  </div>
                </CardContent>
              </Card>

              {results.dischargeTime > 0 && (
                <Card className="mt-8 bg-blue-50 dark:bg-black">
                  <CardHeader>
                    <CardTitle>Resultados del Cálculo</CardTitle>
                    <CardDescription>Basado en los parámetros ingresados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">

                      <ResultCard icon={<ZapIcon />} title="Tiempo de Carga (100%)" value={`${results.chargingTime.toFixed(2)} h`} />
                      <ResultCard icon={<ClockIcon />} title="Tiempo de Carga (0-80%)" value={`${results.chargingTime80Percent.toFixed(2)} h`} />
                      <ResultCard icon={<EuroIcon />} title="Coste de Carga" value={`${results.chargeCost.toFixed(2)} €`} />
                      <ResultCard icon={<ZapIcon />} title="Consumo Eléctrico" value={`${results.consumption.toFixed(2)} kWh`} />
                      <ResultCard icon={<BatteryIcon />} title="Tiempo de Descarga" value={`${results.dischargeTime.toFixed(2)} h`} />
                      <ResultCard icon={<CarIcon />} title="Autonomía Real" value={`${results.actualRange.toFixed(2)} km`} />
                      <ResultCard icon={<ZapIcon />} title="Eficiencia" value={`${results.efficiency.toFixed(2)} km/kWh`} />
                      <ResultCard icon={<EuroIcon />} title="Costo por 100 km" value={`${results.costPer100km.toFixed(2)} €`} />
                      <ResultCard icon={<LeafIcon />} title="CO2 Ahorrado" value={`${results.co2Saved.toFixed(2)} kg`} />
                      <ResultCard icon={<CalendarIcon />} title="Rango Diario Estimado" value={`${results.dailyRangeEstimate.toFixed(2)} km`} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Información Adicional</CardTitle>
                  <CardDescription>Detalles importantes sobre vehículos eléctricos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoSection title="Capacidad de la Batería (kWh)" content="Es la cantidad total de energía que la batería puede almacenar. Determina en gran medida la autonomía del vehículo. Las capacidades típicas varían entre 40 kWh para coches urbanos y más de 100 kWh para vehículos de alta gama." />
                  <InfoSection title="Potencia de Carga (kW)" content="Indica la velocidad a la que el coche puede recibir energía. Varía desde 2.2 kW en carga lenta doméstica hasta 22 kW en cargadores rápidos domésticos o públicos. Una mayor potencia de carga reduce el tiempo necesario para recargar la batería." />
                  <InfoSection title="Consumo Promedio (kWh/100km)" content="Mide la eficiencia energética del vehículo. Valores típicos oscilan entre 13-20 kWh/100km. Factores como el estilo de conducción, el clima y el uso de sistemas auxiliares pueden afectar este valor." />
                  <InfoSection title="Autonomía" content="Es la distancia que el coche puede recorrer con una carga completa. Depende de la capacidad de la batería y el consumo. Los rangos actuales varían desde 150 km en modelos urbanos hasta más de 600 km en vehículos de alta gama." />
                  <InfoSection title="Eficiencia de Carga" content="No toda la energía de la red llega a la batería debido a pérdidas en el proceso de carga. La eficiencia varía según el tipo de conector, siendo generalmente mayor en la carga lenta que en la rápida." />
                  <InfoSection title="Tipos de Conectores" content="Existen varios estándares: Tipo 2 (Mennekes) es común en Europa para carga lenta y semi-rápida, CCS para carga rápida en DC, CHAdeMO usado por algunos fabricantes asiáticos, y el conector propietario de Tesla. Cada uno tiene diferentes niveles de eficiencia." />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chargingPoints">
              <Card>
            <CardHeader>
              <CardTitle>Puntos de Recarga en Madrid</CardTitle>
              <CardDescription>Mapa de los puntos de recarga para vehículos eléctricos en Madrid</CardDescription>
            </CardHeader>
              <CardContent>
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
                    {chargingPoints.map((point) => (
                      <Marker
                        key={point.id}
                        position={{ lat: point.lat, lng: point.lng }}
                        label={`${point.points} puntos`}
                        title={point.name}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Puntos de Recarga Destacados</h3>
                  <ul className="list-disc pl-5">
                    {chargingPoints.map((point) => (
                      <li key={point.id}>
                        {point.name} - {point.points} puntos de carga
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conectores">
              <Card>
            <CardHeader>
              <CardTitle>Tipos de Bornes y Conectores para Coches Eléctricos</CardTitle>
              <CardDescription>Conoce los principales tipos de conectores utilizados en la carga de vehículos eléctricos.</CardDescription>
            </CardHeader>
              <CardContent>
              <div className="mt-10">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {connectors.map((connector) => (
                    <Card key={connector.name} className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-foreground">{connector.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center mb-4">
                          <Image
                            src={connector.image}
                            alt={`Conector ${connector.name}`}
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <CardDescription className="text-sm text-muted-foreground mb-4">
                          {connector.description}
                        </CardDescription>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Ventajas:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {connector.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-2 space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Desventajas:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {connector.cons.map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              </CardContent>
              </Card>
            </TabsContent>



            <TabsContent value="financiacion">
            
              <CarFinanceCalculator />
             
            </TabsContent>

            
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  )
}

function ResultCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
      <div className="text-primary mb-2">{icon}</div>
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  )
}

function InfoSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  )
}