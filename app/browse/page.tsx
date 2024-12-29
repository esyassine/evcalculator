"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cars } from "../../data/cars";

// Get unique brands from cars data
const brands = Array.from(new Set(cars.map((car) => car.brand)));
const bodyStyles = Array.from(new Set(cars.map((car) => car.bodyStyle)));

const brandLogos = {
  Tesla: "/brands/tesla.svg",
  BMW: "/brands/bmw.svg",
  Audi: "/brands/audi.svg",
  Mercedes: "/brands/mercedes.svg",
  Volkswagen: "/brands/volkswagen.svg",
  Ford: "/brands/ford.svg",
  Hyundai: "/brands/hyundai.svg",
  Nissan: "/brands/nissan.svg",
  Chevrolet: "/brands/chevrolet.svg",
  Porsche: "/brands/porsche.svg",
  // Add more brand logos as needed
};

const bodyTypeIcons = {
  Hatchback: "/body-types/hatchback.svg",
  Sedan: "/body-types/sedan.svg",
  SUV: "/body-types/suv.svg",
  MPV: "/body-types/mpv.svg",
  "Station/Estate": "/body-types/estate.svg",
  Cabriolet: "/body-types/cabriolet.svg",
  Coupe: "/body-types/coupe.svg",
  "Passenger Van": "/body-types/van.svg",
};

export default function BrowsePage() {
  const router = useRouter();

  const handleBrandClick = (brand: string) => {
    router.push(`/?brand=${brand}`);
  };

  const handleBodyStyleClick = (bodyStyle: string) => {
    router.push(`/?bodyStyle=${bodyStyle}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Makes Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Descubre tu Coche Eléctrico Ideal
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explora nuestra selección de coches eléctricos y encuentra el que
          mejor se adapta a tus necesidades.
        </p>
      </div>
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Makes!</h2>
          <p className="text-muted-foreground">
            Explore our selection of electric vehicles by manufacturer
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Card
              key={brand}
              className="group cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleBrandClick(brand)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-24 h-24 transition-transform group-hover:scale-110">
                  <Image
                    src={
                      brandLogos[brand] || "/placeholder.svg?height=96&width=96"
                    }
                    alt={brand}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-center">{brand}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Body Types Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Body Type!</h2>
          <p className="text-muted-foreground">
            Find the perfect electric vehicle for your needs
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {bodyStyles.map((bodyStyle) => (
            <Card
              key={bodyStyle}
              className="group cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleBodyStyleClick(bodyStyle)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-32 h-24 transition-transform group-hover:scale-110">
                  <Image
                    src={
                      bodyTypeIcons[bodyStyle] ||
                      "/placeholder.svg?height=96&width=128"
                    }
                    alt={bodyStyle}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-center">{bodyStyle}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
