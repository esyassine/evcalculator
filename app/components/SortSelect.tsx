'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type SortOption = {
  label: string
  value: string
}

interface SortSelectProps {
  onSort: (value: string) => void
  defaultValue?: string
}

const sortOptions: SortOption[] = [
  { label: "Relevancia", value: "relevance" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Autonomía: ascendente", value: "range_asc" },
  { label: "Autonomía: descendente", value: "range_desc" },
  { label: "Aceleración: menor a mayor", value: "acceleration_asc" },
  { label: "Aceleración: mayor a menor", value: "acceleration_desc" },
]

export default function SortSelect({ onSort, defaultValue = "relevance" }: SortSelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onSort}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
