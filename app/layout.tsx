import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chemical Hazard Inventory - Craigmore',
  description: 'Chemical inventory management system for emergency response',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-NZ">
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
