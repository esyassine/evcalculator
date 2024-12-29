import { Car } from '../../data/cars'

interface CarDetailProps {
  car: Car
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{car.brand} {car.model}</h2>
      <p><strong>Año:</strong> {car.year}</p>
      <p><strong>Autonomía:</strong> {car.range} km</p>
      <p><strong>Precio:</strong> ${car.price.toLocaleString()}</p>
      <p><strong>Aceleración 0-100 km/h:</strong> {car.acceleration} segundos</p>
      <p><strong>Velocidad máxima:</strong> {car.topSpeed} km/h</p>
      <p><strong>Tiempo de carga:</strong> {car.chargingTime} minutos</p>
      <p><strong>Capacidad de batería:</strong> {car.batteryCapacity} kWh</p>
    </div>
  )
}

export default CarDetail
