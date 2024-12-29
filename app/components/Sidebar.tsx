'use client'

import { useState, useMemo, useEffect } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { Car } from '../../data/cars'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronRight, CarIcon, Truck, Bus } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface SidebarProps {
  cars: Car[]
  onReset: () => void
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

interface Filters {
  brand: string
  models: string[]
  price: number[]
  range: number[]
  acceleration: number[]
  topSpeed: number[]
  chargingTime: number[]
  batteryCapacity: number[]
  segment: string[]
  bodyStyle: string[]
}

const segmentLabels: { [key: string]: string } = {
  'A': 'Mini',
  'B': 'Compact',
  'C': 'Medium',
  'D': 'Large',
  'E': 'Executive',
  'F': 'Luxury',
  'N': 'Passenger Van',
  'S': 'Sports'
}

const Sidebar: React.FC<SidebarProps> = ({ cars, onReset, filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    marca: true,
    modelo: true,
    carroceria: true,
    precio: true,
    autonomia: true,
    aceleracion: true,
    velocidad: false,
    carga: false,
    bateria: false,
    segmento: false

  })

  const brands = useMemo(() => Array.from(new Set(cars.map(car => car.brand))), [cars])
  const allModels = useMemo(() => Array.from(new Set(cars.map(car => car.model))), [cars])
  const bodyStyles = useMemo(() => Array.from(new Set(cars.map(car => car.bodyStyle))), [cars])

  const [filteredModels, setFilteredModels] = useState(allModels)

  useEffect(() => {
    if (filters.brand === 'all') {
      setFilteredModels(allModels)
    } else {
      const brandModels = cars
        .filter(car => car.brand === filters.brand)
        .map(car => car.model)
      setFilteredModels(Array.from(new Set(brandModels)))
    }
  }, [filters.brand, cars, allModels])

  const segmentCounts = useMemo(() => {
    const counts: { [key: string]: number } = {}
    cars.forEach(car => {
      counts[car.segment] = (counts[car.segment] || 0) + 1
    })
    return counts
  }, [cars])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (name: keyof Filters, value: any) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value
      };

      if (name === 'brand') {
        newFilters.models = [];
      }

      if (name === 'models') {
        newFilters.models = value === 'all' ? [] : [value];
      }

      return newFilters;
    });
  };

  const handleArrayToggle = (field: keyof Filters, value: string) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [field]: (prev[field] as string[]).includes(value)
          ? (prev[field] as string[]).filter(v => v !== value)
          : [...(prev[field] as string[]), value]
      };
      
      return newFilters;
    });
  }

  return (
    <div className="w-[300px] bg-white dark:bg-gray-800 p-4 space-y-4 overflow-y-auto max-h-screen">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Filtros</h2>

      {/* Marca Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('marca')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Marca</span>
          {expandedSections.marca ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.marca && (
          <Select
            value={filters.brand}
            onValueChange={(value) => handleFilterChange('brand', value)}
          >
            <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Todas las marcas" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              <SelectItem value="all" className="dark:text-white">Todas las marcas</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand} className="dark:text-white">{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Modelo Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('modelo')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Modelo</span>
          {expandedSections.modelo ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.modelo && (
          <Select
            value={filters.models.length > 0 ? filters.models[0] : "all"}
            onValueChange={(value) => handleFilterChange('models', value)}
            disabled={filters.brand === 'all'}
          >
            <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Seleccionar modelo" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              <SelectItem value="all" className="dark:text-white">Todos los modelos</SelectItem>
              {filteredModels.map(model => (
                <SelectItem key={model} value={model} className="dark:text-white">{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
  {/* Carrocería Section */}
  <div className="space-y-2">
        <button
          onClick={() => toggleSection('carroceria')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Carrocería</span>
          {expandedSections.carroceria ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.carroceria && (
          <div className="grid grid-cols-2 gap-2">
            {bodyStyles.map(style => (
              <button
                key={style}
                onClick={() => handleArrayToggle('bodyStyle', style)}
                className={`flex items-center gap-2 p-3 rounded-lg border ${
                  filters.bodyStyle.includes(style)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                }`}
              >
                {style === 'Sedan' && <CarIcon className="h-5 w-5" />}
                {style === 'SUV' && <Truck className="h-5 w-5" />}
                {style === 'Hatchback' && <CarIcon className="h-5 w-5" />}
                {style === 'MPV' && <Bus className="h-5 w-5" />}
                {style === 'Station/Estate' && <CarIcon className="h-5 w-5" />}
                {style === 'Cabriolet' && <CarIcon className="h-5 w-5" />}
                {style === 'Coupe' && <CarIcon className="h-5 w-5" />}
                {style === 'Passenger Van' && <Bus className="h-5 w-5" />}
                <span className="text-sm">{style}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    
      {/* Rango de Precio Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('precio')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Rango de Precio</span>
          {expandedSections.precio ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.precio && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.price[0]}€</span>
              <span>{filters.price[1]}€</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.price}
              onValueChange={(value) => handleFilterChange('price', value)}
              min={0}
              max={150000}
              step={1000}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Autonomía Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('autonomia')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Autonomía</span>
          {expandedSections.autonomia ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.autonomia && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.range[0]} km</span>
              <span>{filters.range[1]} km</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.range}
              onValueChange={(value) => handleFilterChange('range', value)}
              min={0}
              max={600}
              step={10}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Aceleración Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('aceleracion')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Aceleración</span>
          {expandedSections.aceleracion ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.aceleracion && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.acceleration[0]}s</span>
              <span>{filters.acceleration[1]}s</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.acceleration}
              onValueChange={(value) => handleFilterChange('acceleration', value)}
              min={0}
              max={10}
              step={0.1}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Velocidad Máxima Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('velocidad')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Velocidad Máxima</span>
          {expandedSections.velocidad ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.velocidad && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.topSpeed[0]} km/h</span>
              <span>{filters.topSpeed[1]} km/h</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.topSpeed}
              onValueChange={(value) => handleFilterChange('topSpeed', value)}
              min={0}
              max={250}
              step={5}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Tiempo de Carga Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('carga')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Tiempo de Carga</span>
          {expandedSections.carga ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.carga && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.chargingTime[0]} min</span>
              <span>{filters.chargingTime[1]} min</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.chargingTime}
              onValueChange={(value) => handleFilterChange('chargingTime', value)}
              min={0}
              max={120}
              step={5}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Capacidad de Batería Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('bateria')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Capacidad de Batería</span>
          {expandedSections.bateria ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.bateria && (
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
              <span>{filters.batteryCapacity[0]} kWh</span>
              <span>{filters.batteryCapacity[1]} kWh</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.batteryCapacity}
              onValueChange={(value) => handleFilterChange('batteryCapacity', value)}
              min={0}
              max={200}
              step={1}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow h-[3px] rounded-full">
                <Slider.Range className="absolute bg-emerald-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-gray-200 border-2 border-emerald-500 rounded-full shadow focus:outline-none" />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Segmento Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('segmento')}
          className="flex items-center justify-between w-full text-left font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span>Segmento</span>
          {expandedSections.segmento ? <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
        </button>
        {expandedSections.segmento && (
          <div className="space-y-2">
            {Object.entries(segmentLabels).map(([segment, label]) => (
              <label key={segment} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.segment.includes(segment)}
                  onCheckedChange={() => handleArrayToggle('segment', segment)}
                  disabled={segmentCounts[segment] === 0}
                  className="border-gray-300 dark:border-gray-600 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-sm dark:text-gray-300">
                  {label} ({segmentCounts[segment] || 0})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-700 dark:text-emerald-100 dark:hover:bg-emerald-600"
        >
          Resetear filtros
        </Button>
      </div>

    
    </div>
  )
}

export default Sidebar
