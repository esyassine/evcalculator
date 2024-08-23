import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';

import { Suspense } from 'react';
import Page from "./page";

export const metadata: Metadata = {
  title: 'EV',
  description: 'Calculadora de Coche Eléctrico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div>Cargando...</div>}>
            <Page />
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}