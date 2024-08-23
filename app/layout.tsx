import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

import { Suspense } from 'react';
import Page from "./page";

export const metadata: Metadata = {
  title: 'EV',
  description: 'Calculadora de Coche Eléctrico',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={cn(
          'bg-gray-100 font-sans antialiased dark:bg-black dark:text-white',
          GeistSans.variable
        )}
      >
        <Page />
      </body>
    </html>
  );
}
