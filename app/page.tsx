'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, BatteryIcon, HomeIcon, ZapIcon, EuroIcon, CarIcon } from 'lucide-react'
import {ThemeToggle} from "@/components/ui/Toggle"
import {ThemeProvider} from "@/components/ui/Provider"

export default function Component(props : any) {
  const [batteryCapacity, setBatteryCapacity] = useState(49.2)
  const [chargingPower, setChargingPower] = useState(22)
  const [averageConsumption, setAverageConsumption] = useState(15.2)
  const [isHomeCharging, setIsHomeCharging] = useState(true)
  const [electricityPrice, setElectricityPrice] = useState(0.2)
  const [motorRange, setMotorRange] = useState(402)
  const [results, setResults] = useState({ dischargeTime: 0, consumption: 0, chargeCost: 0, actualRange: 0 })

  const calculateResults = () => {
    const dischargeTime = batteryCapacity / averageConsumption
    const chargingTime = batteryCapacity / chargingPower
    const consumption = batteryCapacity * (isHomeCharging ? 1 : 1.2)
    const chargeCost = consumption * electricityPrice
    const actualRange = (batteryCapacity / averageConsumption) * 100
    setResults({ dischargeTime, consumption, chargeCost, actualRange })
  }

  // Effect to recalculate results when any input changes
  useEffect(() => {
    calculateResults()
  }, [batteryCapacity, chargingPower, averageConsumption, isHomeCharging, electricityPrice, motorRange])

  console.log("props", props)
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Calculadora de Coche Eléctrico</CardTitle>
                <CardDescription>Calcula tiempos de descarga, consumo eléctrico y costes de carga para tu coche eléctrico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
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
                      <Label htmlFor="chargingPower">Potencia de Carga (kW)</Label>
                      <Input
                        id="chargingPower"
                        type="number"
                        value={chargingPower}
                        onChange={(e) => setChargingPower(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="averageConsumption">Consumo Promedio (kWh/100km)</Label>
                      <Input
                        id="averageConsumption"
                        type="number"
                        value={averageConsumption}
                        onChange={(e) => setAverageConsumption(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="electricityPrice">Precio de la Electricidad (€/kWh)</Label>
                      <Input
                        id="electricityPrice"
                        type="number"
                        value={electricityPrice}
                        onChange={(e) => setElectricityPrice(Number(e.target.value))}
                      />
                    </div>
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="charging-mode"
                      checked={isHomeCharging}
                      onCheckedChange={setIsHomeCharging}
                    />
                    <Label htmlFor="charging-mode">Carga en Casa</Label>
                    {isHomeCharging ? <HomeIcon className="ml-2" /> : <ZapIcon className="ml-2" />}
                  </div>
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
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
            
            <Card className="lg:row-span-2">
              <CardHeader>
                <CardTitle>Características de los Coches Eléctricos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Capacidad de la Batería (kWh)</h3>
                  <p>Es la cantidad total de energía que la batería puede almacenar. Determina en gran medida la autonomía del vehículo. Las capacidades típicas varían entre 40 kWh para coches urbanos y más de 100 kWh para vehículos de alta gama.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Potencia de Carga (kW)</h3>
                  <p>Indica la velocidad a la que el coche puede recibir energía. Varía desde 3.7 kW en carga lenta doméstica hasta más de 250 kW en cargadores ultrarrápidos. Una mayor potencia de carga reduce el tiempo necesario para recargar la batería.</p>
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
                  <p>No toda la energía de la red llega a la batería debido a pérdidas en el proceso de carga. La eficiencia suele estar entre el 85% y 95%, siendo generalmente mayor en la carga lenta que en la rápida.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tipos de Conectores</h3>
                  <p>Existen varios estándares: Tipo 2 (Mennekes) es común en Europa para carga lenta y semi-rápida, CCS para carga rápida en DC, CHAdeMO usado por algunos fabricantes asiáticos, y el conector propietario de Tesla.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}