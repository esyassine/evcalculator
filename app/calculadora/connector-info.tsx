import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

const connectors = [
  {
    name: "Tipo 2 (Mennekes)",
    image: "/img/Tipo2.png",
    description: "Estándar europeo para carga en AC. Soporta carga monofásica y trifásica hasta 43 kW.",
    pros: ["Ampliamente utilizado en Europa", "Permite carga rápida en AC"],
    cons: ["No soporta carga ultra-rápida en DC"]
  },
  {
    name: "CCS (Combo)",
    image: "/img/CCS.png",
    description: "Combina el conector Tipo 2 con pines adicionales para carga rápida en DC. Permite cargas de hasta 350 kW.",
    pros: ["Soporta carga rápida y ultra-rápida", "Estándar europeo para nuevos vehículos"],
    cons: ["Menos común en vehículos más antiguos"]
  },
  {
    name: "CHAdeMO",
    image: "/img/CHAdeMO.png",
    description: "Estándar japonés para carga rápida en DC. Soporta cargas de hasta 62.5 kW.",
    pros: ["Ampliamente utilizado en vehículos japoneses", "Permite carga bidireccional"],
    cons: ["Menos común en nuevos vehículos europeos", "Limitado a 62.5 kW"]
  },
  {
    name: "Tesla",
    image: "/img/tesla.png",
    description: "Conector propietario de Tesla para carga en AC y DC. Permite cargas de hasta 250 kW en Superchargers V3.",
    pros: ["Acceso a la red de Superchargers", "Diseño compacto"],
    cons: ["Exclusivo para vehículos Tesla", "Requiere adaptador para usar otros cargadores"]
  }
]

export default function ConnectorInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Bornes y Conectores para Coches Eléctricos</CardTitle>
        <CardDescription>Conoce los principales tipos de conectores utilizados en la carga de vehículos eléctricos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {connectors.map((connector) => (
              <Card key={connector.name} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-foreground">{connector.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <Image
                      src={connector.image}
                      alt={`Conector ${connector.name}`}
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {connector.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Ventajas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {connector.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Desventajas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {connector.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
