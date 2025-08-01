import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

const heroImages = [
  {
    src: "/images/powerflexMDBlayoutimage.jpg",
    alt: "PowerFlex Underfloor Power System - Installation View 1"
  },
  {
    src: "/images/powerflexMDBlayoutimage2.jpg", 
    alt: "PowerFlex Underfloor Power System - Installation View 2"
  },
  {
    src: "/images/powerflexMDBlayoutimage3.jpg",
    alt: "PowerFlex Underfloor Power System - Installation View 3"
  }
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  // Auto-cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 4000) // 4 seconds per card

    return () => clearInterval(interval)
  }, [])
  return (
    <section id="hero" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-8">
                <h1 className="text-6xl md:text-8xl font-bebas font-extrabold leading-none">
                  <span className="text-brand-yellow">
                    <PowerFlexBrand theme="white" />
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Underfloor Power
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl text-brand-yellow font-light">Smarter Power for Modern Spaces</p>

                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Fast, flexible, and future-ready power distribution for today's commercial environments. Our 
                  plug-and-play design streamlines installation and delivers significant cost savings.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4" suppressHydrationWarning>
                <Button
                  size="lg"
                  asChild
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  suppressHydrationWarning
                >
                  <a href="#contact" suppressHydrationWarning>
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-4 text-lg font-semibold bg-transparent backdrop-blur-sm transition-all duration-300"
                  suppressHydrationWarning
                >
                  <a href="#products" suppressHydrationWarning>
                    View Products
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow">FAST</div>
                  <div className="text-sm text-gray-400">Installation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow">FLEXIBLE</div>
                  <div className="text-sm text-gray-400">Design</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow">FUTURE</div>
                  <div className="text-sm text-gray-400">Proofed</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-gray-400 text-sm space-y-1 pt-4">
                <p>+44 (0) 191 378 7900</p>
                <p>info@apexwiringsolutions.co.uk</p>
                <p>www.apexwiringsolutions.co.uk</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-slate-500/20 rounded-3xl blur-3xl"></div>
              
              {/* Card Stack Container */}
              <div className="relative h-96 lg:h-[500px] perspective-1000">
                {heroImages.map((image, index) => {
                  const isActive = index === currentImage
                  const isPrevious = index === (currentImage - 1 + heroImages.length) % heroImages.length
                  const isNext = index === (currentImage + 1) % heroImages.length
                  
                  let cardClasses = "absolute inset-0 rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-700 ease-in-out"
                  
                  if (isActive) {
                    cardClasses += " z-30 opacity-100 transform scale-100 rotate-0"
                  } else if (isPrevious) {
                    cardClasses += " z-20 opacity-60 transform scale-95 -rotate-2 -translate-x-8 translate-y-4"
                  } else if (isNext) {
                    cardClasses += " z-20 opacity-60 transform scale-95 rotate-2 translate-x-8 translate-y-4"
                  } else {
                    cardClasses += " z-10 opacity-30 transform scale-90 translate-y-8"
                  }
                  
                  return (
                    <div key={index} className={cardClasses}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      {/* Card overlay for depth */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-slate-900/20"></div>
                      )}
                    </div>
                  )
                })}
                
                {/* Subtle cycling indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-40">
                  {heroImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-700 ${
                        index === currentImage
                          ? 'w-8 bg-brand-yellow'
                          : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}