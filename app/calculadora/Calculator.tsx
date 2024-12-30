'use client'

import { useState, useEffect } from 'react'
import { useSearchParamsContext } from '../components/SearchParamsProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Battery, Home, Zap, EuroIcon, Car, Leaf, Clock, Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import ConnectorInfo from './connector-info'

export default function Calculator() {
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

  const searchParams = useSearchParamsContext()

  useEffect(() => {
    const batteryCapacity = searchParams.get('batteryCapacity')
    const range = searchParams.get('range')
    const consumption = searchParams.get('consumption')

    if (batteryCapacity) setBatteryCapacity(Number(batteryCapacity))
    if (range) setMotorRange(Number(range))
    if (consumption) setAverageConsumption(Number(consumption))
  }, [searchParams])

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

  useEffect(() => {
    if (!isHomeCharging && chargingPower < 50) {
      setChargingPower(50);
    } else if (isHomeCharging && chargingPower > 22) {
      setChargingPower(22);
    }
  }, [isHomeCharging]);

  const handleChargingPowerChange = (value: number[]) => {
    setChargingPower(value[0])
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsHomeCharging(checked)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calculadora EV</h1>
      </div>
      
      {/* <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400">
          <div className="flex space-x-4">
            <TabsTrigger value="calculator" className="min-w-[120px] text-center">Calculadora</TabsTrigger>
            <TabsTrigger value="info" className="min-w-[120px] text-center">Información</TabsTrigger>
            <TabsTrigger value="conectores" className="min-w-[120px] text-center">Conectores</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="calculator"> */}
          <Card>
            <CardHeader>
              <CardTitle>Parámetros del Vehículo Eléctrico</CardTitle>
              <CardDescription>Ingrese los detalles de su vehículo eléctrico para calcular los costos y la eficiencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      step="0.001"
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
                      max={isHomeCharging ? 22 : 100}
                      step={0.1}
                      value={[chargingPower]}
                      onValueChange={handleChargingPowerChange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1.0 kW</span>
                      <span>{isHomeCharging ? '22 kW' : '100 kW'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="charging-mode"
                      checked={isHomeCharging}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="charging-mode">Carga en Casa</Label>
                    {isHomeCharging ? <Home className="ml-2" /> : <Zap className="ml-2" />}
                  </div>
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
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard icon={<Zap />} title="Tiempo de Carga (100%)" value={`${results.chargingTime.toFixed(2)} h`} />
                  <ResultCard icon={<Clock />} title="Tiempo de Carga (0-80%)" value={`${results.chargingTime80Percent.toFixed(2)} h`} />
                  <ResultCard icon={<EuroIcon />} title="Coste de Carga" value={`${results.chargeCost.toFixed(2)} €`} />
                  <ResultCard icon={<Zap />} title="Consumo Eléctrico" value={`${results.consumption.toFixed(2)} kWh`} />
                  <ResultCard icon={<Battery />} title="Tiempo de Descarga" value={`${results.dischargeTime.toFixed(2)} h`} />
                  <ResultCard icon={<Car />} title="Autonomía Real" value={`${results.actualRange.toFixed(2)} km`} />
                  <ResultCard icon={<Zap />} title="Eficiencia" value={`${results.efficiency.toFixed(2)} km/kWh`} />
                  <ResultCard icon={<EuroIcon />} title="Costo por 100 km" value={`${results.costPer100km.toFixed(2)} €`} />
                  <ResultCard icon={<Leaf />} title="CO2 Ahorrado" value={`${results.co2Saved.toFixed(2)} kg`} />
                  <ResultCard icon={<Calendar />} title="Rango Diario Estimado" value={`${results.dailyRangeEstimate.toFixed(2)} km`} />
                </div>
              </CardContent>
            </Card>
          )}
       
    </div>
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
