'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { BatteryIcon, HomeIcon, ZapIcon, EuroIcon, CarIcon, LeafIcon, ClockIcon, CalendarIcon } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/ui/Toggle"
import { ThemeProvider } from "@/components/ui/Provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

export default function ElectricCarCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState(49.2)
  const [chargingPower, setChargingPower] = useState(22)
  const [averageConsumption, setAverageConsumption] = useState(14.6)
  const [isHomeCharging, setIsHomeCharging] = useState(true)
  const [electricityPrice, setElectricityPrice] = useState(0.2)
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
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Calculadora EV</h1>
            <ThemeToggle />
          </div>
          
          <Tabs defaultValue="calculator" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator">
              <Card>
                <CardHeader>
                  <CardTitle>Parámetros del Vehículo Eléctrico</CardTitle>
                  <CardDescription>Ingrese los detalles de su vehículo eléctrico para calcular los costos y la eficiencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <Label>Potencia de Carga (kW)</Label>
                        <RadioGroup
                          value={chargingPower.toString()}
                          onValueChange={handleChargingPowerChange}
                          className="flex flex-wrap gap-2"
                        >
                          {[2.2, 3.7, 7.4, 11, 22].map((power) => (
                            <div key={power} className="flex items-center space-x-2">
                              <RadioGroupItem value={power.toString()} id={`power-${power}`} />
                              <Label htmlFor={`power-${power}`}>{power}</Label>
                            </div>
                          ))}
                        </RadioGroup>
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
                        <Label htmlFor="connectorType">Tipo de Conector</Label>
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
                          onChange={(e) => setElectricityPrice(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dailyDrivingDistance">Distancia de Conducción Diaria (km)</Label>
                        <Input
                          id="dailyDrivingDistance"
                          type="number"
                          value={dailyDrivingDistance}
                          onChange={(e) => setDailyDrivingDistance(Number(e.target.value))}
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
                    <Button onClick={calculateResults} className="w-full sm:w-auto">Calcular</Button>
                  </div>
                </CardContent>
              </Card>

              {results.dischargeTime > 0 && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Resultados del Cálculo</CardTitle>
                    <CardDescription>Basado en los parámetros ingresados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <ResultCard icon={<BatteryIcon />} title="Tiempo de Descarga" value={`${results.dischargeTime.toFixed(2)} h`} />
                      <ResultCard icon={<ZapIcon />} title="Tiempo de Carga (100%)" value={`${results.chargingTime.toFixed(2)} h`} />
                      <ResultCard icon={<ClockIcon />} title="Tiempo de Carga (0-80%)" value={`${results.chargingTime80Percent.toFixed(2)} h`} />
                      <ResultCard icon={<ZapIcon />} title="Consumo Eléctrico" value={`${results.consumption.toFixed(2)} kWh`} />
                      <ResultCard icon={<EuroIcon />} title="Coste de Carga" value={`${results.chargeCost.toFixed(2)} €`} />
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
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  )
}

function ResultCard({ icon, title, value }: any) {
  return (
    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
      <div className="text-primary mb-2">{icon}</div>
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  )
}

function InfoSection({ title, content } : any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  )
}