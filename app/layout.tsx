import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})


export const metadata: Metadata = {
  title: "PowerFlex - Underfloor Power by Apex Wiring Solutions",
  description:
    "PowerFlex underfloor power distribution systems for modern offices. Fast, flexible installation with modular components. UK manufactured since 1980. Get quotes for commercial underfloor power solutions.",
  keywords: "underfloor power, office power distribution, commercial wiring, modular power systems, underfloor electrical, PowerFlex, Apex Wiring Solutions, UK electrical contractor",
  openGraph: {
    title: "PowerFlex - Underfloor Power by Apex Wiring Solutions",
    description: "Fast, flexible, future-ready underfloor power distribution for modern commercial spaces. UK manufactured since 1980.",
    type: "website",
    locale: "en_GB",
    siteName: "PowerFlex by Apex Wiring Solutions"
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerFlex - Underfloor Power by Apex Wiring Solutions", 
    description: "Fast, flexible, future-ready underfloor power distribution for modern commercial spaces."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://powerflex.apexwiringsolutions.co.uk"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://use.typekit.net/nqx5bej.css" />
        {/* Preload hero images for instant display */}
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage.jpg" />
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage2.jpg" />
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage3.jpg" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
