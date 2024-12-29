import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filters } from './HomePage'

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveFilter: (filterType: keyof Filters, value?: string | number[]) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const hasActiveFilters = () => {
    return (
      filters.brand !== 'all' ||
      filters.models.length > 0 ||
      filters.segment.length > 0 ||
      filters.bodyStyle.length > 0 ||
      filters.price[0] !== 0 ||
      filters.price[1] !== 150000 ||
      filters.range[0] !== 0 ||
      filters.range[1] !== 600 ||
      filters.acceleration[0] !== 0 ||
      filters.acceleration[1] !== 10 ||
      filters.topSpeed[0] !== 0 ||
      filters.topSpeed[1] !== 250 ||
      filters.chargingTime[0] !== 0 ||
      filters.chargingTime[1] !== 120 ||
      filters.batteryCapacity[0] !== 0 ||
      filters.batteryCapacity[1] !== 200
    )
  }

  const formatRangeValue = (value: number[], unit: string) => {
    return `${value[0]} - ${value[1]}${unit}`
  }

  if (!hasActiveFilters()) return null

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        {filters.brand !== 'all' && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Marca: {filters.brand}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('brand')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {filters.models.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Modelo: {filters.models.join(', ')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('models')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.price[0] !== 0 || filters.price[1] !== 150000) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Precio: {formatRangeValue(filters.price, '€')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('price')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.range[0] !== 0 || filters.range[1] !== 600) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Autonomía: {formatRangeValue(filters.range, 'km')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('range')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.acceleration[0] !== 0 || filters.acceleration[1] !== 10) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Aceleración: {formatRangeValue(filters.acceleration, 's')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('acceleration')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.topSpeed[0] !== 0 || filters.topSpeed[1] !== 250) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Velocidad Máxima: {formatRangeValue(filters.topSpeed, 'km/h')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('topSpeed')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.chargingTime[0] !== 0 || filters.chargingTime[1] !== 120) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Tiempo de Carga: {formatRangeValue(filters.chargingTime, 'min')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('chargingTime')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(filters.batteryCapacity[0] !== 0 || filters.batteryCapacity[1] !== 200) && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Capacidad de Batería: {formatRangeValue(filters.batteryCapacity, 'kWh')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('batteryCapacity')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {filters.segment.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Segmento: {filters.segment.join(', ')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('segment')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {filters.bodyStyle.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            <span className="mr-2">Carrocería: {filters.bodyStyle.join(', ')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter('bodyStyle')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        <Button
          variant="link"
          size="sm"
          onClick={onClearAll}
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Limpiar todos los filtros
        </Button>
      </div>
    </div>
  )
}
