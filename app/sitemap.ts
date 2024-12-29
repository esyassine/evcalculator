import { MetadataRoute } from 'next'
import { cars } from '../data/cars'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.electricars.es'

  const staticPages = [
    '',
    '/browse',
    '/compare',
    '/calculadora',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const dynamicPages = cars.map(car => ({
    url: `${baseUrl}/${car.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticPages, ...dynamicPages]
}

