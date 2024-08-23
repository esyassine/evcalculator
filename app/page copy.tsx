"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { BatteryIcon, HomeIcon, ZapIcon, EuroIcon } from 'lucide-react'
import { ThemeToggle } from "@/components/ui/Toggle"
import { ThemeProvider } from "@/components/ui/Provider"

export default function Component() {
  const [batteryCapacity, setBatteryCapacity] = useState(49.2) // Capacidad real del Mini Cooper en kWh
  const [averageConsumption, setAverageConsumption] = useState(14.3) // Consumo promedio en kWh/100 km
  const [electricityPrice, setElectricityPrice] = useState(0.15) // Precio por kWh en euros
  const [isHomeCharging, setIsHomeCharging] = useState(true) // Modo de carga
  const [results, setResults] = useState({ dischargeTime: 0, consumption: 0, chargeCost: 0 })

  const calculateResults = () => {
    const batteryCapacity = 49.2; // Capacidad de la batería en kWh
    const averageConsumption = 14.5; // Consumo promedio en kWh/100 km
    const electricityPrice = 0.15; // Precio de la electricidad en €/kWh
    const chargingPower = 11; // Potencia de carga en kW
    const isHomeCharging = true; // Si es carga en casa
  
    // Cálculo del tiempo de descarga en km
    const dischargeTime = (batteryCapacity / averageConsumption) * 100;
  
    // Cálculo del consumo eléctrico total en kWh
    const consumption = batteryCapacity;
  
    // Cálculo del coste de carga en euros
    const chargeCost = consumption * electricityPrice;
  
    setResults({ dischargeTime, consumption, chargeCost });
  }
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Calculadora de Coche Eléctrico - Mini Cooper</CardTitle>
              <CardDescription>Calcula tiempos de descarga, consumo eléctrico y costes de carga para tu Mini Cooper eléctrico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="averageConsumption">Consumo Promedio (kWh/100km)</Label>
                    <Input
                      id="averageConsumption"
                      type="number"
                      value={averageConsumption}
                      onChange={(e) => setAverageConsumption(Number(e.target.value))}
                    />
                  </div>
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="charging-mode"
                    checked={isHomeCharging}
                    onCheckedChange={setIsHomeCharging}
                  />
                  <Label htmlFor="charging-mode">Carga en Casa</Label>
                  {isHomeCharging ? <HomeIcon className="ml-2" /> : <ZapIcon className="ml-2" />}
                </div>
                <Button onClick={calculateResults}>Calcular</Button>
              </div>

              {results.dischargeTime > 0 && (
                <div className="mt-6 grid gap-4">
                  <div className="flex items-center space-x-2">
                    <BatteryIcon />
                    <span>Tiempo de Descarga: {results.dischargeTime.toFixed(2)} horas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ZapIcon />
                    <span>Consumo Eléctrico: {results.consumption.toFixed(2)} kWh</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EuroIcon />
                    <span>Coste de Carga: {results.chargeCost.toFixed(2)} €</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}
