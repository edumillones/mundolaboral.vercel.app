import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MundoLaboral - Oportunidades Laborales en el Extranjero",
  description: "Conectamos profesionales sudamericanos con oportunidades laborales en el extranjero.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
