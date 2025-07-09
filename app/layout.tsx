import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})


export const metadata: Metadata = {
  title: "Apex Wiring Solutions - Professional Power Distribution",
  description:
    "Professional wiring solutions for industrial applications. Master distribution, slave distribution, tee distributors, and power leads.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nqx5bej.css" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
