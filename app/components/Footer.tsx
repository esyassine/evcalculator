import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Zap className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold ml-2">ElectriCars</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              La plataforma líder de vehículos eléctricos en España. 
              Encuentra y compara los mejores coches eléctricos de forma rápida y sencilla.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-pink-500 hover:text-pink-600">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Classifieds
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/affiliates" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Affiliates Program
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact us</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">Email</p>
              <a href="mailto:info@electricars.com" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500">
                info@electricars.com
              </a>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Whatsapp</p>
              <a href="tel:+34900000000" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500">
                +34 900 000 000
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Copyright © ElectriCars {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
