import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inventario de Riesgo Químico - Craigmore',
  description: 'Sistema de gestión de inventario químico para respuesta a emergencias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
