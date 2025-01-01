export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  range: number;
  price: number;
  acceleration: number;
  topSpeed: number;
  chargingTime: number;
  batteryCapacity: number;
  imageUrl: string;
  segment: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'N' | 'S';
  bodyStyle: 'Hatchback' | 'Sedan' | 'SUV' | 'MPV' | 'Station/Estate' | 'Cabriolet' | 'Coupe' | 'Passenger Van';
}

export const cars: Car[] = [
  {
    id: "tesla-model-3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    range: 358,
    price: 40000,
    acceleration: 3.1,
    topSpeed: 162,
    chargingTime: 30,
    batteryCapacity: 75,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "D",
    bodyStyle: "Sedan"
  },
  {
    id: "chevrolet-bolt-ev",
    brand: "Chevrolet",
    model: "Bolt EV",
    year: 2023,
    range: 259,
    price: 31995,
    acceleration: 6.5,
    topSpeed: 93,
    chargingTime: 60,
    batteryCapacity: 65,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "B",
    bodyStyle: "Hatchback"
  },
  {
    id: "nissan-leaf",
    brand: "Nissan",
    model: "Leaf",
    year: 2023,
    range: 226,
    price: 27800,
    acceleration: 7.4,
    topSpeed: 90,
    chargingTime: 40,
    batteryCapacity: 62,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "C",
    bodyStyle: "Hatchback"
  },
  {
    id: "ford-mustang-mach-e",
    brand: "Ford",
    model: "Mustang Mach-E",
    year: 2023,
    range: 305,
    price: 45995,
    acceleration: 3.7,
    topSpeed: 124,
    chargingTime: 45,
    batteryCapacity: 88,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "D",
    bodyStyle: "SUV"
  },
  {
    id: "volkswagen-id4",
    brand: "Volkswagen",
    model: "ID.4",
    year: 2023,
    range: 250,
    price: 41230,
    acceleration: 7.6,
    topSpeed: 99,
    chargingTime: 38,
    batteryCapacity: 82,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "C",
    bodyStyle: "SUV"
  },
  {
    id: "hyundai-ioniq-5",
    brand: "Hyundai",
    model: "IONIQ 5",
    year: 2023,
    range: 480,
    price: 41900,
    acceleration: 5.2,
    topSpeed: 185,
    chargingTime: 18,
    batteryCapacity: 72.6,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "C",
    bodyStyle: "SUV"
  },
  {
    id: "kia-ev6",
    brand: "Kia",
    model: "EV6",
    year: 2023,
    range: 510,
    price: 44990,
    acceleration: 5.2,
    topSpeed: 185,
    chargingTime: 18,
    batteryCapacity: 77.4,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "C",
    bodyStyle: "SUV"
  },
  {
    id: "audi-e-tron-gt",
    brand: "Audi",
    model: "e-tron GT",
    year: 2023,
    range: 488,
    price: 104900,
    acceleration: 3.3,
    topSpeed: 245,
    chargingTime: 23,
    batteryCapacity: 93.4,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "F",
    bodyStyle: "Sedan"
  },
  {
    id: "polestar-2",
    brand: "Polestar",
    model: "2",
    year: 2023,
    range: 440,
    price: 49900,
    acceleration: 4.7,
    topSpeed: 205,
    chargingTime: 35,
    batteryCapacity: 78,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "D",
    bodyStyle: "Hatchback"
  },
  {
    id: "bmw-i4",
    brand: "BMW",
    model: "i4",
    year: 2023,
    range: 520,
    price: 65900,
    acceleration: 3.9,
    topSpeed: 225,
    chargingTime: 31,
    batteryCapacity: 83.9,
    imageUrl: "/placeholder.svg?height=200&width=300",
    segment: "D",
    bodyStyle: "Sedan"
  }
];
