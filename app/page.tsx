"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { PowerFlexBrand } from "@/components/powerflex-brand"
import { ProductSidebar } from "@/components/product-sidebar"
import { SystemArchitecture } from "@/components/system-architecture"
import { SystemSchematic } from "@/components/system-schematic"
import { AdaptingModernWorkspace } from "@/components/adapting-modern-workspace"
import { Hero } from "@/components/hero"
import { Contact } from "@/components/contact"
import { CookieConsent } from "@/components/cookie-consent"
import { AnalyticsInit } from "@/components/analytics-init"
import {
  X,
  Menu,
  Phone,
  Mail,
  MapPin,
  Download,
  FileText,
  Shield,
  ArrowRight,
  Clock,
  Star,
  Zap,
  Award,
  CheckCircle,
  ExternalLink,
  ImageIcon,
  Building,
  Building2,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  TrendingUp,
} from "lucide-react"

export default function ApexWiringLanding() {
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY
        // Simple scroll position based detection - more performant
        const windowHeight = window.innerHeight
        const inHeroSection = scrollY < windowHeight * 0.8
        const nearBottom = scrollY > document.documentElement.scrollHeight - windowHeight * 1.5
        
        setIsDarkSection(inHeroSection || nearBottom)
      }, 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  // Simple smooth scroll function
  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }


  return (
    <div className="min-h-screen bg-white font-inter" suppressHydrationWarning={true}>
      {/* Navigation */}
      <nav className="fixed z-[10000] w-full">
        {/* Mobile: Floating compact bar */}
        <div className="lg:hidden top-4 left-4 right-4 absolute">
          <div className={`backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 ${
            isDarkSection 
              ? 'bg-slate-800/90 border border-white/20' 
              : 'bg-white/90 border border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between">
              <a href="#hero" className="flex items-center">
                <img 
                  src="/apex-logo.svg" 
                  alt="Apex" 
                  className={`w-8 h-8 transition-all duration-300 ${
                    isDarkSection ? 'filter invert' : ''
                  }`} 
                />
              </a>
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
                      : 'text-gray-700 hover:text-brand-yellow hover:bg-gray-100'
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
        
        {/* Desktop: Keep current design exactly */}
        <div className="hidden lg:block top-8 left-1/2 transform -translate-x-1/2 absolute">
          <div className="relative flex items-center">
            {/* Left Nav Bar */}
            <div className={`backdrop-blur-md rounded-l-full pl-8 pr-24 py-3 shadow-xl transition-all duration-300 ${
              isDarkSection 
                ? 'bg-slate-800/90 border border-white/20' 
                : 'bg-white/90 border border-gray-200/50'
            }`}>
              <div className="flex items-center space-x-6">
                <button onClick={() => smoothScrollTo('benefits')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Benefits</button>
                <button onClick={() => smoothScrollTo('products')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Products</button>
                <button onClick={() => smoothScrollTo('comparison')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Comparison</button>
              </div>
            </div>
            
            {/* Right Nav Bar */}
            <div className={`backdrop-blur-md rounded-r-full pr-8 pl-24 py-3 shadow-xl transition-all duration-300 ${
              isDarkSection 
                ? 'bg-slate-800/90 border border-white/20' 
                : 'bg-white/90 border border-gray-200/50'
            }`}>
              <div className="flex items-center space-x-6">
                <button onClick={() => smoothScrollTo('architecture')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Architecture</button>
                <button onClick={() => smoothScrollTo('schematic')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Schematic</button>
                <button onClick={() => smoothScrollTo('contact')} className={`transition-all duration-300 text-sm font-medium hover:scale-105 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-700 hover:text-brand-yellow'
                }`}>Contact</button>
              </div>
            </div>
            
            {/* Center Logo Circle - positioned above nav bars */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => smoothScrollTo('hero')} 
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 ${
                  isDarkSection 
                    ? 'bg-slate-800/90 border border-white/20 hover:bg-slate-700/90' 
                    : 'bg-white/90 border border-gray-200/50 hover:bg-gray-50/90'
                }`}
              >
                <img
                  src="/apex-logo.svg"
                  alt="Apex Wiring Solutions"
                  className={`w-16 h-16 object-contain transition-all duration-300 ${
                    isDarkSection 
                      ? 'filter invert' 
                      : ''
                  }`}
                />
              </button>
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
            
            <img 
              src="/apex-logo.svg" 
              alt="Apex Wiring Solutions" 
              className="w-16 h-16 filter invert" 
            />
            
            <nav className="space-y-6 text-center">
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
                href="#comparison" 
                className="block text-2xl text-white font-medium hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comparison
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
            
            <Button 
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy text-lg px-8 py-4 font-semibold"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </Button>
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

      {/* Comparison Section */}
      <section id="comparison" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
                Why Choose <PowerFlexBrand size="xl" theme="navy" />?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                See how our revolutionary underfloor power systems outperform traditional overhead solutions across
                every critical metric that matters to your business.
              </p>
            </div>

            {/* Comparison Cards Content */}
            <div className="text-center py-20">
              <h3 className="text-2xl font-bebas font-extrabold text-slate-600 mb-4">
                Comparison Content Coming Soon
              </h3>
              <p className="text-gray-500">
                Performance comparison charts will be displayed here
              </p>
            </div>
          </div>
        </div>
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
