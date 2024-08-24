'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, BatteryIcon, HomeIcon, ZapIcon, EuroIcon, CarIcon, LeafIcon, ClockIcon, CalendarIcon } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/ui/Toggle"
import { ThemeProvider } from "@/components/ui/Provider"

export default function ElectricCarCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState(49.2)
  const [chargingPower, setChargingPower] = useState(22)
  const [averageConsumption, setAverageConsumption] = useState(15.2)
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Calculadora EV</CardTitle>
              <CardDescription>Calcula tiempos de descarga, consumo eléctrico y costes de carga para tu coche eléctrico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="batteryCapacity">Capacidad de la Batería (kWh)</Label>
                    <Input
                      id="batteryCapacity"
                      type="number"
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Potencia de Carga (kW)</Label>
                    <RadioGroup
                      value={chargingPower.toString()}
                      onValueChange={handleChargingPowerChange}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {[2.2, 3.7, 7.4, 11, 22].map((power) => (
                        <div key={power} className="flex items-center space-x-2">
                          <RadioGroupItem value={power.toString()} id={`power-${power}`} />
                          <Label htmlFor={`power-${power}`}>{power}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
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
                  
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                 
                  <div>
                    <Label htmlFor="electricityPrice">Precio de la Electricidad (€/kWh)</Label>
                    <Input
                      id="electricityPrice"
                      type="number"
                      value={electricityPrice}
                      onChange={(e) => setElectricityPrice(Number(e.target.value))}
                    />
                  </div>
                  <div>
                  <Label htmlFor="dailyDrivingDistance">Distancia de Conducción Diaria (km)</Label>
                  <Input
                    id="dailyDrivingDistance"
                    type="number"
                    value={dailyDrivingDistance}
                    onChange={(e) => setDailyDrivingDistance(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="motorRange">Autonomía del Motor Eléctrico (km)</Label>
                  <Input
                    id="motorRange"
                    type="number"
                    value={motorRange}
                    onChange={(e) => setMotorRange(Number(e.target.value))}
                  />
                </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
               
                
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
                <Button onClick={calculateResults}>Calcular</Button>
              </div>

              {results.dischargeTime > 0 && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Resultados del Cálculo</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <BatteryIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Tiempo de Descarga</span>
                        <span className="text-2xl font-bold">{results.dischargeTime.toFixed(2)} h</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <ZapIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Tiempo de Carga</span>
                        <span className="text-2xl font-bold">{results.chargingTime.toFixed(2)} h</span>
                      </div>

                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <ClockIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Tiempo de Carga (0-80%)</span>
                        <span className="text-2xl font-bold">{results.chargingTime80Percent.toFixed(2)} h</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <ZapIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Consumo Eléctrico</span>
                        <span className="text-2xl font-bold">{results.consumption.toFixed(2)} kWh</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <EuroIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Coste de Carga</span>
                        <span className="text-2xl font-bold">{results.chargeCost.toFixed(2)} €</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <CarIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Autonomía Real</span>
                        <span className="text-2xl font-bold">{results.actualRange.toFixed(2)} km</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <ZapIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Eficiencia</span>
                        <span className="text-2xl font-bold">{results.efficiency.toFixed(2)} km/kWh</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <EuroIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Costo por 100 km</span>
                        <span className="text-2xl font-bold">{results.costPer100km.toFixed(2)} €</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <LeafIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">CO2 Ahorrado</span>
                        <span className="text-2xl font-bold">{results.co2Saved.toFixed(2)} kg</span>
                      </div>
                    


                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <CalendarIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">Rango Diario Estimado</span>
                        <span className="text-2xl font-bold">{results.dailyRangeEstimate.toFixed(2)} km</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Capacidad de la Batería (kWh)</h3>
                  <p>Es la cantidad total de energía que la batería puede almacenar. Determina en gran medida la autonomía del vehículo. Las capacidades típicas varían entre 40 kWh para coches urbanos y más de 100 kWh para vehículos de alta gama.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Potencia de Carga (kW)</h3>
                  <p>Indica la velocidad a la que el coche puede recibir energía. Varía desde 2.2 kW en carga lenta doméstica hasta 22 kW en cargadores rápidos domésticos o públicos. Una mayor potencia de carga reduce el tiempo necesario para recargar la batería.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Consumo Promedio (kWh/100km)</h3>
                  <p>Mide la eficiencia energética del vehículo. Valores típicos oscilan entre 13-20 kWh/100km. Factores como el estilo de conducción, el clima y el uso de sistemas auxiliares pueden afectar este valor.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Autonomía</h3>
                  <p>Es la distancia que el coche puede recorrer con una carga completa. Depende de la capacidad de la batería y el consumo. Los rangos actuales varían desde 150 km en modelos urbanos hasta más de 600 km en vehículos de alta gama.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Eficiencia de Carga</h3>
                  <p>No toda la energía de la red llega a la batería debido a pérdidas en el proceso de carga. La eficiencia varía según el tipo de conector, siendo generalmente mayor en la carga lenta que en la rápida.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tipos de Conectores</h3>
                  <p>Existen varios estándares: Tipo 2 (Mennekes) es común en Europa para carga lenta y semi-rápida, CCS para carga rápida en DC, CHAdeMO usado por algunos fabricantes asiáticos, y el conector propietario de Tesla. Cada uno tiene diferentes niveles de eficiencia.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}