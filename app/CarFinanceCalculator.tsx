'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CarIcon, CreditCardIcon, CalendarIcon, PercentIcon, DollarSignIcon, InfoIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Función para formatear números como cantidades en euros
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

export default function CarFinanceCalculator() {
  const [carPrice, setCarPrice] = useState(42039.40)
  const [downPayment, setDownPayment] = useState(7700)
  const [loanTerm, setLoanTerm] = useState(48)
  const [interestRate, setInterestRate] = useState(4.99)
  const [openingFee, setOpeningFee] = useState(1.49)
  const [monthlyPayment, setMonthlyPayment] = useState(383.49)
  const [results, setResults] = useState({
    calculatedMonthlyPayment: 0,
    financedAmount: 0,
    totalInterest: 0,
    totalCost: 0,
    apr: 0,
    actualLoanTerm: 0,
    finalPayment: 0
  })

  const loanTermOptions = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120]

  useEffect(() => {
    calculateFinancing()
  }, [carPrice, downPayment, loanTerm, interestRate, openingFee, monthlyPayment])

  const calculateFinancing = () => {
    const loanAmount = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const openingFeeAmount = loanAmount * (openingFee / 100)
    const financedAmount = loanAmount + openingFeeAmount

    let calculatedMonthlyPayment, actualLoanTerm, totalPaid, totalInterest, finalPayment = 0

    if (monthlyPayment > 0) {
      calculatedMonthlyPayment = monthlyPayment
      actualLoanTerm = Math.ceil(Math.log(calculatedMonthlyPayment / (calculatedMonthlyPayment - financedAmount * monthlyRate)) / Math.log(1 + monthlyRate))
      
      if (actualLoanTerm > loanTerm) {
        const balanceAtEndOfTerm = financedAmount * Math.pow(1 + monthlyRate, loanTerm) - calculatedMonthlyPayment * ((Math.pow(1 + monthlyRate, loanTerm) - 1) / monthlyRate)
        finalPayment = balanceAtEndOfTerm
        actualLoanTerm = loanTerm
      }
    } else {
      actualLoanTerm = loanTerm
      calculatedMonthlyPayment = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, actualLoanTerm)) / (Math.pow(1 + monthlyRate, actualLoanTerm) - 1)
    }

    totalPaid = calculatedMonthlyPayment * actualLoanTerm + finalPayment
    totalInterest = totalPaid - financedAmount

    // Cálculo de la TAE (APR)
    const apr = (Math.pow(1 + totalInterest / financedAmount, 1 / (actualLoanTerm / 12)) - 1) * 12 * 100

    setResults({
      calculatedMonthlyPayment,
      financedAmount,
      totalInterest,
      totalCost: totalPaid + downPayment,
      apr,
      actualLoanTerm,
      finalPayment
    })
  }

  return (
    <div className="container mx-auto p-0">
      <Card className="w-full max-w-1xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Calculadora de Financiación de Coches</CardTitle>
          <CardDescription>Ingrese los detalles para calcular su financiación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carPrice">Precio del Coche (€)</Label>
                <div className="relative">
                  <CarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="carPrice"
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="downPayment">Entrada Inicial (€)</Label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Plazo (meses)</Label>
                <Select
                  value={loanTerm.toString()}
                  onValueChange={(value) => setLoanTerm(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTermOptions.map((term) => (
                      <SelectItem key={term} value={term.toString()}>
                        {term} meses
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Cuota Mensual Deseada (€)</Label>
                <div className="relative">
                  <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="monthlyPayment"
                    type="number"
                    value={monthlyPayment || ''}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="pl-10"
                    placeholder="Opcional"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">TIN Anual (%)</Label>
                <div className="relative">
                  <PercentIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.01"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="openingFee">Comisión de Apertura (%)</Label>
                <div className="relative">
                  <PercentIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="openingFee"
                    type="number"
                    value={openingFee}
                    onChange={(e) => setOpeningFee(Number(e.target.value))}
                    step="0.01"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {results.calculatedMonthlyPayment > 0 && (
            <Card className="mt-6 bg-primary/10">
              <CardHeader>
                <CardTitle>Resultados del Cálculo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
             
                  <ResultItem
                    label="Cuota Mensual Calculada"
                    value={formatCurrency(results.calculatedMonthlyPayment)}
                    icon={<CreditCardIcon className="h-6 w-6" />}
                    tooltip="La cuota mensual calculada basada en los parámetros ingresados"
                  />
                  <ResultItem
                    label="Plazo del Préstamo"
                    value={`${results.actualLoanTerm} meses`}
                    icon={<CalendarIcon className="h-6 w-6" />}
                    tooltip="Duración total del préstamo en meses"
                  />
                  <ResultItem
                    label="Importe Financiado"
                    value={formatCurrency(results.financedAmount)}
                    icon={<DollarSignIcon className="h-6 w-6" />}
                    tooltip="El monto total que estás pidiendo prestado, incluyendo la comisión de apertura"
                  />
                  <ResultItem
                    label="Intereses Totales"
                    value={formatCurrency(results.totalInterest)}
                    icon={<PercentIcon className="h-6 w-6" />}
                    tooltip="La cantidad total que pagarás en intereses durante la vida del préstamo"
                  />
                  <ResultItem
                    label="Coste Total"
                    value={formatCurrency(results.totalCost)}
                    icon={<DollarSignIcon className="h-6 w-6" />}
                    tooltip="El costo total del coche, incluyendo la entrada inicial, el préstamo y todos los intereses"
                  />
                  <ResultItem
                    label="TAE"
                    value={`${results.apr.toFixed(2)}%`}
                    icon={<PercentIcon className="h-6 w-6" />}
                    tooltip="Tasa Anual Equivalente: el costo total del préstamo expresado como un porcentaje anual"
                  />
                  {results.finalPayment > 0 && (
                    <ResultItem
                      label="Cuota Final"
                      value={formatCurrency(results.finalPayment)}
                      icon={<DollarSignIcon className="h-6 w-6" />}
                      tooltip="Pago final al término del plazo seleccionado para completar la financiación"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ResultItem({ label, value, icon, tooltip } : any) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-4 bg-background rounded-lg p-4 shadow-sm">
            <div className="bg-primary/20 p-3 rounded-full">{icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
            <InfoIcon className="h-5 w-5 text-muted-foreground ml-auto" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}