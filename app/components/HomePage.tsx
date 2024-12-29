'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParamsContext } from './SearchParamsProvider'
import { cars, Car } from '../../data/cars'
import Sidebar from './Sidebar'
import CarList from './CarList'
import { Search, Menu, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from './Pagination'
import ComparisonTray from './ComparisonTray'
import SortSelect from './SortSelect'
import ActiveFilters from './ActiveFilters'

const ITEMS_PER_PAGE = 6

export interface Filters {
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

export default function HomePage() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<string[]>([])
  const [totalResults, setTotalResults] = useState(cars.length)
  const [searchTime, setSearchTime] = useState(0)
  const [sortOption, setSortOption] = useState('relevance')
  const [filters, setFilters] = useState<Filters>({
    brand: 'all',
    models: [],
    price: [0, 150000],
    range: [0, 600],
    acceleration: [0, 10],
    topSpeed: [0, 250],
    chargingTime: [0, 120],
    batteryCapacity: [0, 200],
    segment: [],
    bodyStyle: []
  })

  const router = useRouter()
  const searchParams = useSearchParamsContext()

  const handleReset = useCallback(() => {
    setFilters({
      brand: 'all',
      models: [],
      price: [0, 150000],
      range: [0, 600],
      acceleration: [0, 10],
      topSpeed: [0, 250],
      chargingTime: [0, 120],
      batteryCapacity: [0, 200],
      segment: [],
      bodyStyle: []
    });
    setSearchTerm('');
    setSortOption('relevance');
    setCurrentPage(1);
  }, []);

  const handleFilter = useMemo(() => {
    return (currentFilters: Filters, currentSearchTerm: string, currentSortOption: string) => {
      const startTime = performance.now()
      
      let filtered = cars.filter(car => {
        if (currentFilters.brand !== 'all' && car.brand !== currentFilters.brand) return false;
        if (currentFilters.models.length > 0 && !currentFilters.models.includes(car.model)) return false;
        if (car.price < currentFilters.price[0] || car.price > currentFilters.price[1]) return false;
        if (car.range < currentFilters.range[0] || car.range > currentFilters.range[1]) return false;
        if (car.acceleration < currentFilters.acceleration[0] || car.acceleration > currentFilters.acceleration[1]) return false;
        if (car.topSpeed < currentFilters.topSpeed[0] || car.topSpeed > currentFilters.topSpeed[1]) return false;
        if (car.chargingTime < currentFilters.chargingTime[0] || car.chargingTime > currentFilters.chargingTime[1]) return false;
        if (car.batteryCapacity < currentFilters.batteryCapacity[0] || car.batteryCapacity > currentFilters.batteryCapacity[1]) return false;
        if (currentFilters.segment.length > 0 && !currentFilters.segment.includes(car.segment)) return false;
        if (currentFilters.bodyStyle.length > 0 && !currentFilters.bodyStyle.includes(car.bodyStyle)) return false;
        return true;
      });

      if (currentSearchTerm) {
        const lowercasedSearchTerm = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(car => 
          car.brand.toLowerCase().includes(lowercasedSearchTerm) ||
          car.model.toLowerCase().includes(lowercasedSearchTerm) ||
          car.segment.toLowerCase().includes(lowercasedSearchTerm) ||
          car.bodyStyle.toLowerCase().includes(lowercasedSearchTerm)
        );
      }

      filtered.sort((a, b) => {
        switch (currentSortOption) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'range_asc':
            return a.range - b.range;
          case 'range_desc':
            return b.range - a.range;
          case 'acceleration_asc':
            return a.acceleration - b.acceleration;
          case 'acceleration_desc':
            return b.acceleration - a.acceleration;
          default:
            return 0;
        }
      });

      const endTime = performance.now()
      
      return {
        filtered,
        searchTime: Math.round(endTime - startTime),
        totalResults: filtered.length
      }
    }
  }, [])

  // Apply filters
  useEffect(() => {
    const { filtered, searchTime: newSearchTime, totalResults: newTotalResults } = handleFilter(filters, searchTerm, sortOption)
    setFilteredCars(filtered)
    setSearchTime(newSearchTime)
    setTotalResults(newTotalResults)
    setCurrentPage(1)
  }, [filters, searchTerm, sortOption, handleFilter])

  const handleCarSelect = (car: Car) => {
    router.push(`/${car.id}`)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleToggleComparison = useCallback((carId: string) => {
    setSelectedCarsForComparison(prev => {
      const newSelection = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
      return newSelection
    })
  }, [])

  const handleCompare = () => {
    if (selectedCarsForComparison.length > 0) {
      router.push(`/compare?ids=${selectedCarsForComparison.join(',')}`)
    }
  };

  const handleSort = (value: string) => {
    setSortOption(value);
  }

  const handleRemoveFilter = (filterType: keyof Filters, value?: string | number[]) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      
      switch (filterType) {
        case 'brand':
          newFilters.brand = 'all'
          newFilters.models = []
          break
        case 'models':
          newFilters.models = []
          break
        case 'segment':
          newFilters.segment = []
          break
        case 'bodyStyle':
          newFilters.bodyStyle = []
          break
        case 'range':
          newFilters.range = [0, 600]
          break
        case 'price':
          newFilters.price = [0, 150000]
          break
        case 'acceleration':
          newFilters.acceleration = [0, 10]
          break
        case 'topSpeed':
          newFilters.topSpeed = [0, 250]
          break
        case 'chargingTime':
          newFilters.chargingTime = [0, 120]
          break
        case 'batteryCapacity':
          newFilters.batteryCapacity = [0, 200]
          break
      }
      
      return newFilters
    })
  }

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  const selectedCarsData = useMemo(() => 
    cars.filter(car => selectedCarsForComparison.includes(car.id)),
    [selectedCarsForComparison]
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 lg:w-72 xl:w-80 shrink-0 border-r bg-white dark:bg-gray-800 overflow-y-auto">
          <Sidebar 
            cars={cars} 
            onReset={handleReset} 
            filters={filters} 
            setFilters={setFilters}
          />
        </aside>

        {/* Mobile sidebar */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${isMobileSidebarOpen ? 'block' : 'hidden'}`} onClick={toggleMobileSidebar}></div>
        <aside className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold dark:text-white">Filtros</h2>
            <Button onClick={toggleMobileSidebar} variant="ghost" size="icon">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            <Sidebar 
              cars={cars} 
              onReset={handleReset} 
              filters={filters} 
              setFilters={setFilters}
            />
          </div>
        </aside>

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
           
            <div className="mb-6 relative max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar coches por marca, modelo o características..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 w-full py-3 text-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <SortSelect onSort={handleSort} />
              </div>
              <ActiveFilters 
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleReset}
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {totalResults} resultados encontrados en {searchTime}ms
              </div>
            </div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Catálogo de Coches Eléctricos</h2>
              <Button onClick={toggleMobileSidebar} variant="outline" size="sm" className="md:hidden">
                <Menu className="h-5 w-5 mr-2" /> Filtros
              </Button>
            </div>
            {filteredCars.length > 0 ? (
              <>
                <CarList 
                  cars={paginatedCars} 
                  onSelectCar={handleCarSelect}
                  selectedCarsForComparison={selectedCarsForComparison}
                  onToggleComparison={handleToggleComparison}
                />
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600 dark:text-gray-400">No se encontraron coches que coincidan con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <ComparisonTray
        selectedCarsForComparison={selectedCarsForComparison}
        onRemove={(carId) => handleToggleComparison(carId)}
        onCompare={handleCompare}
        cars={cars}
      />
    </div>
  )
}

