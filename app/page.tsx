"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  ArrowRight,
  Award,
  BarChart3,
  Building,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  ImageIcon,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PowerFlexBrand } from "@/components/powerflex-brand"
import { Hero } from "@/components/hero"
import { AdaptingModernWorkspace } from "@/components/adapting-modern-workspace"
import { ProductSidebar } from "@/components/product-sidebar"
import { SystemArchitecture } from "@/components/system-architecture"
import { SystemSchematic } from "@/components/system-schematic"
import { Contact } from "@/components/contact"
import { CookieConsent } from "@/components/cookie-consent"
import { AnalyticsInit } from "@/components/analytics-init"

export default function ApexWiringLanding() {
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const desktopBrandDropdownRef = useRef<HTMLDivElement>(null)
  const mobileBrandDropdownRef = useRef<HTMLDivElement>(null)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)

  // Handle mobile menu scroll lock
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle navigation color change with throttled scroll
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let cachedDocHeight = 0

    // Cache document height on mount and resize to avoid forced reflows
    const updateDocHeight = () => {
      cachedDocHeight = document.documentElement.scrollHeight
    }

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const inHeroSection = scrollY < windowHeight * 0.8
        // Use cached height to avoid forced reflow
        const nearBottom = scrollY > cachedDocHeight - windowHeight * 1.5
        
        setIsDarkSection(inHeroSection || nearBottom)
      }, 10)
    }

    // Initial setup
    updateDocHeight()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateDocHeight, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateDocHeight)
      clearTimeout(timeoutId)
    }
  }, [])

  // Close brand dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((desktopBrandDropdownRef.current && !desktopBrandDropdownRef.current.contains(event.target as Node)) &&
          (mobileBrandDropdownRef.current && !mobileBrandDropdownRef.current.contains(event.target as Node))) {
        setIsBrandDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Optimized smooth scroll function - avoid forced reflows
  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      // Use getBoundingClientRect() once instead of offsetTop for better performance
      const rect = element.getBoundingClientRect()
      const offsetTop = rect.top + window.scrollY - 80 // Account for navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }


  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden" suppressHydrationWarning={true}>
      {/* Navigation */}
      <nav className="fixed z-[10000] w-full">
        {/* Mobile: Floating compact bar */}
        <div className="lg:hidden top-4 left-4 right-4 absolute max-w-[calc(100vw-32px)]">
          <div className={`backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 ${
            isDarkSection 
              ? 'bg-slate-800/90 border border-white/20' 
              : 'bg-white/90 border border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between">
              <PowerFlexBrand 
                theme={isDarkSection ? "white" : "navy"} 
                className="h-6"
              />
              <div className="flex items-center space-x-3">
                <Button 
                  size="sm" 
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy px-4 py-2 text-xs font-medium font-semibold"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact
                </Button>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDarkSection 
                      ? 'text-white/80 hover:text-white hover:bg-white/10' 
                      : 'text-brand-navy hover:text-brand-yellow hover:bg-gray-100'
                  }`}
                >
                  <div className="relative w-5 h-5">
                    <Menu className={`w-5 h-5 absolute transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`} />
                    <X className={`w-5 h-5 absolute transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop: Single centered nav bar */}
        <div className="hidden lg:block top-8 left-1/2 transform -translate-x-1/2 absolute">
          <div className={`backdrop-blur-md rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 ${
            isDarkSection 
              ? 'bg-slate-800/90 border border-white/20' 
              : 'bg-white/90 border border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-6">
              <div className="relative" ref={desktopBrandDropdownRef}>
                <button 
                  onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                  className="flex items-center gap-1 hover:scale-105 transition-all duration-300"
                >
                  <PowerFlexBrand 
                    theme={isDarkSection ? "white" : "navy"} 
                    className="h-6"
                  />
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                    isDarkSection ? 'text-white/60' : 'text-brand-navy/60'
                  } ${
                    isBrandDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
                
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 -ml-2 mt-4 backdrop-blur-md rounded-xl shadow-2xl border overflow-hidden transition-all duration-300 ${
                  isDarkSection 
                    ? 'bg-slate-800/95 border-white/20' 
                    : 'bg-white/95 border-gray-200/50'
                } ${
                  isBrandDropdownOpen 
                    ? 'max-h-40 opacity-100' 
                    : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="p-3 flex flex-col gap-2">
                    <button 
                      className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 border-2 border-brand-yellow hover:bg-brand-yellow/10"
                      onClick={() => setIsBrandDropdownOpen(false)}
                    >
                      <PowerFlexBrand theme={isDarkSection ? "white" : "navy"} className="h-6" />
                    </button>
                    <a 
                      href="https://www.apexwiringsolutions.co.uk/home"
                      className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-brand-yellow/10"
                      onClick={() => setIsBrandDropdownOpen(false)}
                    >
                      <img 
                        src="/apex-logo.svg" 
                        alt="Apex" 
                        className={`w-8 h-8 transition-all duration-300 ${
                          isDarkSection ? 'filter invert' : ''
                        }`} 
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <button onClick={() => smoothScrollTo('hero')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Intro</button>
              <button onClick={() => smoothScrollTo('benefits')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Benefits</button>
              <button onClick={() => smoothScrollTo('products')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Products</button>
              <button onClick={() => smoothScrollTo('architecture')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Architecture</button>
              <button onClick={() => smoothScrollTo('schematic')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Schematic</button>
              <button onClick={() => smoothScrollTo('contact')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-brand-navy hover:text-brand-yellow'
              }`}>Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Simple Mobile Menu */}
      <div className={`fixed inset-0 z-[9999] lg:hidden backdrop-blur-md bg-slate-900/95 transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-700 ease-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-brand-yellow transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative" ref={mobileBrandDropdownRef}>
              <button 
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <PowerFlexBrand theme="white" className="h-12" />
                <ChevronDown className={`h-4 w-4 text-white/60 transition-transform duration-200 ${
                  isBrandDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`} />
              </button>
              
              <div className={`mt-4 backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden bg-slate-800/95 border-white/20 transition-all duration-300 ${
                isBrandDropdownOpen 
                  ? 'max-h-40 opacity-100' 
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <div className="p-3 flex flex-col gap-2">
                  <button 
                    className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 border-2 border-brand-yellow hover:bg-brand-yellow/10"
                    onClick={() => setIsBrandDropdownOpen(false)}
                  >
                    <PowerFlexBrand theme="white" className="h-6" />
                  </button>
                  <a 
                    href="https://www.apexwiringsolutions.co.uk/home"
                    className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-brand-yellow/10"
                    onClick={() => {setIsBrandDropdownOpen(false); setIsMobileMenuOpen(false);}}
                  >
                    <img 
                      src="/apex-logo.svg" 
                      alt="Apex" 
                      className="w-8 h-8 filter invert transition-all duration-300" 
                    />
                  </a>
                </div>
              </div>
            </div>
            
            <nav className="space-y-6 text-center">
              <a 
                href="#hero" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Intro
              </a>
              <a 
                href="#benefits" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="#products" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </a>
              <a 
                href="#architecture" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Architecture
              </a>
              <a 
                href="#schematic" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schematic
              </a>
              <a 
                href="#contact" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Adapting The Modern Workspace */}
      <AdaptingModernWorkspace />

      {/* Product Showcase */}
      <section id="products">
        <ProductSidebar />
      </section>


      {/* System Architecture */}
      <SystemArchitecture />

      {/* System Schematic */}
      <SystemSchematic />

      {/* Contact Section */}
      <Contact />

      {/* Analytics Initialization */}
      <AnalyticsInit />

      {/* Cookie Consent Banner */}
      <CookieConsent 
        onAccept={() => setCookiesAccepted(true)}
        onDecline={() => setCookiesAccepted(false)}
      />
    </div>
  )
}
