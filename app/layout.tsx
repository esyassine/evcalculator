import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ElectriCars - Catálogo de Coches Eléctricos',
    template: '%s | ElectriCars'
  },
  description: 'Encuentra y compara los mejores coches eléctricos en España. Explora nuestro catálogo completo con especificaciones detalladas y herramientas de comparación.',
  keywords: ['coches eléctricos', 'vehículos eléctricos', 'EV', 'catálogo', 'comparación', 'España'],
  authors: [{ name: 'ElectriCars' }],
  creator: 'ElectriCars',
  publisher: 'ElectriCars',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.electricars.es',
    siteName: 'ElectriCars',
    title: 'ElectriCars - Catálogo de Coches Eléctricos en España',
    description: 'Explora y compara los mejores coches eléctricos disponibles en España. Encuentra el vehículo perfecto para ti con nuestras herramientas de comparación y especificaciones detalladas.',
    images: [
      {
        url: 'https://www.electricars.es/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ElectriCars - Catálogo de Coches Eléctricos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElectriCars - Catálogo de Coches Eléctricos en España',
    description: 'Explora y compara los mejores coches eléctricos disponibles en España. Encuentra el vehículo perfecto para ti.',
    images: ['https://www.electricars.es/twitter-image.jpg'],
    creator: '@electricars',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.electricars.es',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.electricars.es" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div>Loading header...</div>}>
              <Header />
            </Suspense>
            <main className="flex-1">
              <Suspense fallback={<div>Loading content...</div>}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

