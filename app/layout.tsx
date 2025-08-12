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
    siteName: "PowerFlex by Apex Wiring Solutions",
    url: "https://powerflex.apexwiringsolutions.co.uk",
    images: [
      {
        url: "https://powerflex.apexwiringsolutions.co.uk/images/powerflex-og-image.svg",
        width: 1200,
        height: 630,
        alt: "PowerFlex - Underfloor Power by Apex Wiring Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerFlex - Underfloor Power by Apex Wiring Solutions", 
    description: "Fast, flexible, future-ready underfloor power distribution for modern commercial spaces.",
    images: ["https://powerflex.apexwiringsolutions.co.uk/images/powerflex-og-image.svg"]
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
  },
  other: {
    'google-site-verification': 'REPLACE_WITH_ACTUAL_VERIFICATION_CODE'
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
        
        {/* Favicon set */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e293b" />
        
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/nqx5bej.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Apex Wiring Solutions",
              "url": "https://www.apexwiringsolutions.co.uk",
              "logo": "https://powerflex.apexwiringsolutions.co.uk/apex-logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-191-378-7900",
                "contactType": "customer service",
                "areaServed": "GB",
                "availableLanguage": "en"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "foundingDate": "1980",
              "description": "UK manufacturer of underfloor power distribution systems since 1980. PowerFlex modular solutions for commercial and industrial applications.",
              "sameAs": [
                "https://powerflex.apexwiringsolutions.co.uk"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PowerFlex Underfloor Power Distribution System",
              "description": "Modular underfloor power distribution systems for modern commercial spaces. Fast, flexible installation with UK manufacturing quality.",
              "brand": {
                "@type": "Brand",
                "name": "PowerFlex by Apex Wiring Solutions"
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "Apex Wiring Solutions"
              },
              "category": "Electrical Distribution Equipment",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "GBP",
                "seller": {
                  "@type": "Organization",
                  "name": "Apex Wiring Solutions"
                }
              }
            })
          }}
        />
        {/* Preload all full-size hero images for desktop */}
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage2.webp" />
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage3.webp" />
        <link rel="preload" as="image" href="/images/powerflexMDBlayoutimage-600.webp" media="(max-width: 768px)" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize UTM tracking on page load
              (function() {
                if (typeof window !== 'undefined') {
                  const urlParams = new URLSearchParams(window.location.search);
                  const hasUTMParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
                    .some(param => urlParams.get(param));
                  
                  if (hasUTMParams) {
                    const utmData = {
                      utm_source: urlParams.get('utm_source'),
                      utm_medium: urlParams.get('utm_medium'),
                      utm_campaign: urlParams.get('utm_campaign'),
                      utm_term: urlParams.get('utm_term'),
                      utm_content: urlParams.get('utm_content')
                    };
                    sessionStorage.setItem('utm_params', JSON.stringify(utmData));
                  }
                }
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
